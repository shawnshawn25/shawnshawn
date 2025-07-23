import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, User, Mail, Phone, DollarSign } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameName: string;
}

interface PaymentForm {
  username: string;
  email: string;
  phone: string;
  creditAmount: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, gameName }) => {
  const [formData, setFormData] = useState<PaymentForm>({
    username: '',
    email: '',
    phone: '',
    creditAmount: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const [errors, setErrors] = useState<Partial<PaymentForm>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<PaymentForm> = {};

    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) newErrors.phone = 'Phone number is invalid';
    if (!formData.creditAmount.trim()) newErrors.creditAmount = 'Credit amount is required';
    else if (isNaN(Number(formData.creditAmount)) || Number(formData.creditAmount) <= 0) {
      newErrors.creditAmount = 'Credit amount must be a positive number';
    }
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
    else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
    else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Expiry date must be MM/YY format';
    }
    if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
    else if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = 'CVV must be 3-4 digits';
    if (!formData.cardholderName.trim()) newErrors.cardholderName = 'Cardholder name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof PaymentForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Here you would integrate with your payment processor
    console.log('Payment submitted:', { ...formData, gameName });
    
    alert(`Payment successful! Credits will be added to ${gameName} for user: ${formData.username}`);
    setIsProcessing(false);
    onClose();
    
    // Reset form
    setFormData({
      username: '',
      email: '',
      phone: '',
      creditAmount: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: ''
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-gradient-to-br from-red-950 via-red-900 to-black rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto border-2 border-gold-500/30 shadow-2xl shadow-red-500/20"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gold-300 to-gold-100 bg-clip-text text-transparent">Purchase Credits</h2>
              <button
                onClick={onClose}
                className="text-gold-300/60 hover:text-gold-300 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-6 p-4 bg-gradient-to-r from-gold-600/20 to-red-600/20 border border-gold-500/50 rounded-lg">
              <p className="text-white text-sm">
                <strong>Game:</strong> {gameName}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Player Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <User size={20} className="text-gold-400" />
                  Player Information
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">
                    Username *
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    className={`w-full px-3 py-2 bg-gradient-to-r from-red-900/50 to-black/50 border rounded-lg text-white placeholder-gold-300/60 focus:outline-none focus:border-gold-400 focus:shadow-lg focus:shadow-gold-500/20 transition-all duration-300 backdrop-blur-sm ${
                      errors.username ? 'border-red-500' : 'border-gold-500/30'
                    }`}
                    placeholder="Enter player username"
                  />
                  {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-400/60" size={16} />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full pl-10 pr-3 py-2 bg-gradient-to-r from-red-900/50 to-black/50 border rounded-lg text-white placeholder-gold-300/60 focus:outline-none focus:border-gold-400 focus:shadow-lg focus:shadow-gold-500/20 transition-all duration-300 backdrop-blur-sm ${
                        errors.email ? 'border-red-500' : 'border-gold-500/30'
                      }`}
                      placeholder="Enter email address"
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-400/60" size={16} />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full pl-10 pr-3 py-2 bg-gradient-to-r from-red-900/50 to-black/50 border rounded-lg text-white placeholder-gold-300/60 focus:outline-none focus:border-gold-400 focus:shadow-lg focus:shadow-gold-500/20 transition-all duration-300 backdrop-blur-sm ${
                        errors.phone ? 'border-red-500' : 'border-gold-500/30'
                      }`}
                      placeholder="Enter phone number"
                    />
                  </div>
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">
                    Credit Amount ($) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-400/60" size={16} />
                    <input
                      type="number"
                      min="1"
                      step="0.01"
                      value={formData.creditAmount}
                      onChange={(e) => handleInputChange('creditAmount', e.target.value)}
                      className={`w-full pl-10 pr-3 py-2 bg-gradient-to-r from-red-900/50 to-black/50 border rounded-lg text-white placeholder-gold-300/60 focus:outline-none focus:border-gold-400 focus:shadow-lg focus:shadow-gold-500/20 transition-all duration-300 backdrop-blur-sm ${
                        errors.creditAmount ? 'border-red-500' : 'border-gold-500/30'
                      }`}
                      placeholder="Enter amount"
                    />
                  </div>
                  {errors.creditAmount && <p className="text-red-400 text-xs mt-1">{errors.creditAmount}</p>}
                </div>
              </div>

              {/* Payment Information */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <CreditCard size={20} className="text-gold-400" />
                  Payment Information
                </h3>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">
                    Cardholder Name *
                  </label>
                  <input
                    type="text"
                    value={formData.cardholderName}
                    onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                    className={`w-full px-3 py-2 bg-gradient-to-r from-red-900/50 to-black/50 border rounded-lg text-white placeholder-gold-300/60 focus:outline-none focus:border-gold-400 focus:shadow-lg focus:shadow-gold-500/20 transition-all duration-300 backdrop-blur-sm ${
                      errors.cardholderName ? 'border-red-500' : 'border-gold-500/30'
                    }`}
                    placeholder="Name on card"
                  />
                  {errors.cardholderName && <p className="text-red-400 text-xs mt-1">{errors.cardholderName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                    maxLength={19}
                    className={`w-full px-3 py-2 bg-gradient-to-r from-red-900/50 to-black/50 border rounded-lg text-white placeholder-gold-300/60 focus:outline-none focus:border-gold-400 focus:shadow-lg focus:shadow-gold-500/20 transition-all duration-300 backdrop-blur-sm ${
                      errors.cardNumber ? 'border-red-500' : 'border-gold-500/30'
                    }`}
                    placeholder="1234 5678 9012 3456"
                  />
                  {errors.cardNumber && <p className="text-red-400 text-xs mt-1">{errors.cardNumber}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                      maxLength={5}
                      className={`w-full px-3 py-2 bg-gradient-to-r from-red-900/50 to-black/50 border rounded-lg text-white placeholder-gold-300/60 focus:outline-none focus:border-gold-400 focus:shadow-lg focus:shadow-gold-500/20 transition-all duration-300 backdrop-blur-sm ${
                        errors.expiryDate ? 'border-red-500' : 'border-gold-500/30'
                      }`}
                      placeholder="MM/YY"
                    />
                    {errors.expiryDate && <p className="text-red-400 text-xs mt-1">{errors.expiryDate}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1">
                      CVV *
                    </label>
                    <input
                      type="text"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                      maxLength={4}
                      className={`w-full px-3 py-2 bg-gradient-to-r from-red-900/50 to-black/50 border rounded-lg text-white placeholder-gold-300/60 focus:outline-none focus:border-gold-400 focus:shadow-lg focus:shadow-gold-500/20 transition-all duration-300 backdrop-blur-sm ${
                        errors.cvv ? 'border-red-500' : 'border-gold-500/30'
                      }`}
                      placeholder="123"
                    />
                    {errors.cvv && <p className="text-red-400 text-xs mt-1">{errors.cvv}</p>}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white rounded-lg font-bold transition-all duration-300 border border-gray-500/50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 hover:from-gold-500 hover:via-gold-400 hover:to-gold-500 disabled:from-gray-700 disabled:to-gray-600 disabled:cursor-not-allowed text-black font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border border-gold-400/50 shadow-lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    'Purchase Credits'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;