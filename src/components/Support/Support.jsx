import React, { useState, useEffect } from 'react';
import styles from './Support.module.scss';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';

const TELEGRAM_BOT_TOKEN = '7913368433:AAGvykJTn5reMRq7o9Vu_NCeNlVLLou1ojk';
const TELEGRAM_CHAT_ID = '7196063556';

const Support = () => {
  const [activeTab, setActiveTab] = useState('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    uid: '',
    telegram: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketMessages, setTicketMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  // Получаем список обращений
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const { data, error } = await supabase
          .from('support_tickets')
          .select('*, support_messages(*)')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setTickets(data || []);
      } catch (err) {
        console.error('Error fetching tickets:', err);
      }
    };

    fetchTickets();

    // Подписка на обновления
    const ticketsSubscription = supabase
      .channel('tickets_channel')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'support_tickets' },
        () => fetchTickets()
      )
      .subscribe();

    const messagesSubscription = supabase
      .channel('messages_channel')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'support_messages' },
        () => {
          if (selectedTicket) {
            fetchTicketMessages(selectedTicket.id);
          }
        }
      )
      .subscribe();

    return () => {
      ticketsSubscription.unsubscribe();
      messagesSubscription.unsubscribe();
    };
  }, [selectedTicket]);

  // Получаем сообщения для выбранного обращения
  const fetchTicketMessages = async (ticketId) => {
    try {
      const { data, error } = await supabase
        .from('support_messages')
        .select('*')
        .eq('ticket_id', ticketId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setTicketMessages(data || []);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  // При выборе обращения загружаем его сообщения
  useEffect(() => {
    if (selectedTicket) {
      fetchTicketMessages(selectedTicket.id);
    }
  }, [selectedTicket]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setIsSubmitted(false);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email (example@domain.com)';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const sendToTelegram = async (ticketNumber, message, isNewTicket = false) => {
    try {
      const messageText = isNewTicket ? `
🆕 Новое обращение #${ticketNumber}

👤 От: ${formData.name}
📧 Email: ${formData.email}
🆔 UID: ${formData.uid || 'Не указан'}
📱 Telegram: ${formData.telegram || 'Не указан'}

💬 Сообщение:
${message}

@toyokokids
` : `
💬 Новое сообщение по обращению #${ticketNumber}

${message}

@toyokokids
`;

      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: messageText,
          parse_mode: 'HTML'
        })
      });

      const responseData = await response.json();
      if (!response.ok || !responseData.ok) {
        throw new Error(responseData.description || 'Failed to send message to Telegram');
      }

      return responseData.result.message_id;
    } catch (error) {
      console.error('Error sending to Telegram:', error);
      throw new Error('Failed to send message to Telegram. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Создаем новое обращение
      const { data: ticketData, error: ticketError } = await supabase
        .from('support_tickets')
        .insert([{
          name: formData.name,
          email: formData.email,
          telegram: formData.telegram,
          uid: formData.uid,
          status: 'open'
        }])
        .select()
        .single();

      if (ticketError) throw ticketError;

      // Отправляем сообщение в Telegram и получаем message_id
      const telegramMessageId = await sendToTelegram(
        ticketData.ticket_number,
        formData.message,
        true
      );

      // Сохраняем первое сообщение
      const { error: messageError } = await supabase
        .from('support_messages')
        .insert([{
          ticket_id: ticketData.id,
          message: formData.message,
          telegram_message_id: telegramMessageId
        }]);

      if (messageError) throw messageError;

      setIsSubmitted(true);
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          message: '',
          uid: '',
          telegram: ''
        });
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error creating ticket:', error);
      alert(error.message || 'Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedTicket) return;

    setIsSendingMessage(true);
    try {
      // Отправляем сообщение в Telegram и получаем message_id
      const telegramMessageId = await sendToTelegram(
        selectedTicket.ticket_number,
        newMessage
      );

      // Сохраняем сообщение
      const { error: messageError } = await supabase
        .from('support_messages')
        .insert([{
          ticket_id: selectedTicket.id,
          message: newMessage,
          telegram_message_id: telegramMessageId
        }]);

      if (messageError) throw messageError;

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert(error.message || 'Error sending message. Please try again.');
    } finally {
      setIsSendingMessage(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <motion.div 
        className={styles.heroSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={styles.mainTitle}>Support Center</h1>
        <p className={styles.subtitle}>How can we help you today?</p>
      </motion.div>

      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'contact' ? styles.active : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          New Request
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'tickets' ? styles.active : ''}`}
          onClick={() => setActiveTab('tickets')}
        >
          My Requests
        </button>
      </div>

      <div className={styles.contentWrapper}>
        {activeTab === 'contact' && (
          <motion.div 
            className={styles.contactSection}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.contactInfo}>
              <h2 className={styles.header}>Get in Touch</h2>
              <p className={styles.question}>How can we help you today?</p>
              <p className={styles.text}>
                Our support team is here to assist you with any questions or concerns you may have.
                We typically respond within 24 hours.
              </p>
              <div className={styles.contactMethods}>
                <div className={styles.method}>
                  <span className={styles.methodIcon}>📧</span>
                  <span>Email Support</span>
                </div>
                <div className={styles.method}>
                  <span className={styles.methodIcon}>💬</span>
                  <span>Live Chat</span>
                </div>
                <div className={styles.method}>
                  <span className={styles.methodIcon}>📞</span>
                  <span>Phone Support</span>
                </div>
              </div>
            </div>

            <motion.form 
              onSubmit={handleSubmit} 
              className={styles.form}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className={styles.row}>
                <div className={`${styles.formGroup} ${styles.formControl}`}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? styles.errorInput : ''}
                    required
                  />
                  {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                </div>
                <div className={`${styles.formGroup} ${styles.formControl}`}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? styles.errorInput : ''}
                    required
                  />
                  {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>
              </div>

              <div className={styles.row}>
                <div className={`${styles.formGroup} ${styles.formControl}`}>
                  <input
                    type="text"
                    name="uid"
                    placeholder="UID (optional)"
                    value={formData.uid}
                    onChange={handleChange}
                  />
                </div>
                <div className={`${styles.formGroup} ${styles.formControl}`}>
                  <input
                    type="text"
                    name="telegram"
                    placeholder="Telegram Username (optional)"
                    value={formData.telegram}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={`${styles.formGroup} ${styles.formControl}`}>
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? styles.errorInput : ''}
                  required
                />
                {errors.message && <span className={styles.errorText}>{errors.message}</span>}
              </div>

              <motion.button 
                type="submit" 
                className={`${styles.button} ${isSubmitted ? styles.success : ''}`}
                disabled={isSubmitting || isSubmitted}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'Sending...' : isSubmitted ? 'Message Sent!' : 'Send Message'}
              </motion.button>
            </motion.form>
          </motion.div>
        )}

        {activeTab === 'tickets' && (
          <motion.div 
            className={styles.ticketsSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.ticketsList}>
              <h2 className={styles.sectionTitle}>My Requests</h2>
              {tickets.map(ticket => (
                <div 
                  key={ticket.id} 
                  className={`${styles.ticketItem} ${selectedTicket?.id === ticket.id ? styles.selected : ''}`}
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <div className={styles.ticketHeader}>
                    <span className={styles.ticketNumber}>#{ticket.ticket_number}</span>
                    <span className={`${styles.ticketStatus} ${styles[ticket.status]}`}>
                      {ticket.status}
                    </span>
                  </div>
                  <div className={styles.ticketInfo}>
                    <span>{ticket.email}</span>
                    {ticket.telegram && <span>TG: {ticket.telegram}</span>}
                  </div>
                  <span className={styles.ticketTime}>
                    {new Date(ticket.created_at).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {selectedTicket && (
              <div className={styles.chatSection}>
                <div className={styles.chatHeader}>
                  <h3>Request #{selectedTicket.ticket_number}</h3>
                  <span className={`${styles.ticketStatus} ${styles[selectedTicket.status]}`}>
                    {selectedTicket.status}
                  </span>
                </div>

                <div className={styles.messagesList}>
                  {ticketMessages.map(message => (
                    <div 
                      key={message.id}
                      className={`${styles.messageItem} ${message.is_support ? styles.support : styles.user}`}
                    >
                      <div className={styles.messageContent}>
                        {message.message}
                      </div>
                      <span className={styles.messageTime}>
                        {new Date(message.created_at).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className={styles.messageForm}>
                  <textarea
                    className={styles.messageInput}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                  />
                  <button 
                    type="submit" 
                    className={styles.sendButton}
                    disabled={isSendingMessage || !newMessage.trim()}
                  >
                    {isSendingMessage ? 'Sending...' : 'Send'}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Support;