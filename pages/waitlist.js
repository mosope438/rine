import { useEffect, useState } from 'react';
import Head from 'next/head';
import SEO from '../src/components/seo';
import CustomLogo from '../src/components/logo/CustomLogo';
import { useGetConfigData } from '../src/api-manage/hooks/useGetConfigData';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { Typography, Box, Stack, Button } from '@mui/material';

export default function Waitlist() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [activeTab, setActiveTab] = useState('vendor');
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const router = useRouter();
  const { data: configData } = useGetConfigData();

  // Prevent mobile zoom on input focus
  useEffect(() => {
    const handleFocus = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') {
        e.target.style.fontSize = '16px'; // Prevents zoom on iOS
      }
    };

    const handleBlur = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') {
        e.target.style.fontSize = ''; // Reset to original
      }
    };

    document.addEventListener('focus', handleFocus, true);
    document.addEventListener('blur', handleBlur, true);

    return () => {
      document.removeEventListener('focus', handleFocus, true);
      document.removeEventListener('blur', handleBlur, true);
    };
  }, []);

  useEffect(() => {
    const launchDate = new Date('March 1, 2025 00:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      setTimeLeft({
        days: Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24))),
        hours: Math.max(0, Math.floor((distance / (1000 * 60 * 60)) % 24)),
        minutes: Math.max(0, Math.floor((distance / (1000 * 60)) % 60)),
        seconds: Math.max(0, Math.floor((distance / 1000) % 60))
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setFormData({});
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (activeTab === 'vendor') {
      if (!formData.businessName) newErrors.businessName = 'Business name is required';
      if (!formData.contactPerson) newErrors.contactPerson = 'Contact person is required';
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.phone) newErrors.phone = 'Phone number is required';
    } else if (activeTab === 'rider') {
      if (!formData.fullName) newErrors.fullName = 'Full name is required';
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.phone) newErrors.phone = 'Phone number is required';
    } else if (activeTab === 'customer') {
      if (!formData.fullName) newErrors.fullName = 'Full name is required';
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.phone) newErrors.phone = 'Phone number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const emailSubject = `New ${activeTab} waitlist submission`;
      let emailBody = `New ${activeTab} waitlist submission:\n\n`;
      
      Object.entries(formData).forEach(([key, value]) => {
        emailBody += `${key}: ${value}\n`;
      });
      
      emailBody += `\nSubmitted at: ${new Date().toLocaleString()}`;
      
      const mailtoLink = `mailto:hello@rine.africa?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      
      window.location.href = mailtoLink;
      
      toast.success('Opening your email client...');
      
      setTimeout(() => {
        setFormData({});
        setIsSubmitting(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit form. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Rine – Join the Waitlist</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <SEO title="Rine – Join the Waitlist" description="A unified commerce platform connecting customers, vendors and riders. Join the waitlist and be part of day one." />
      
      <div style={{
        margin: 0,
        background: '#f4ffff',
        color: '#2b2b2b',
        fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: 'auto',
          padding: '40px 20px 80px'
        }}>
       <Box
  component="header"
  sx={{
    textAlign: 'center',
    mb: { xs: 4, md: 5 }, // responsive margin-bottom
  }}
>
  {/* Logo */}
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      mb: { xs: 2, md: 4 }, // responsive margin-bottom
    }}
  >
    <CustomLogo
      logoImg="/Rine_logo.png"
      atlText="Rine Logo"
      width="120px"
      height="40px"
    />
  </Box>

  {/* Main Heading */}
  <Typography
    variant="h1"
    sx={{
      color: '#551377',
      fontWeight: 'bold',
      mb: 2,
      m: 0,
      fontSize: { xs: '28px', sm: '36px', md: '42px' }, // responsive font size
      lineHeight: 1.2,
    }}
  >
    Rine is launching soon
  </Typography>

  {/* Subheading / description */}
  <Typography
    variant="body1"
    sx={{
      fontSize: { xs: '14px', sm: '16px', md: '18px' }, // responsive font size
      maxWidth: '700px',
      mx: 'auto',
      mt: 2,
      mb: 4,
    }}
  >
    A unified commerce platform connecting customers, vendors and riders.
    Join the waitlist and be part of day one.
  </Typography>
</Box>

        <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    gap: 1, // ~20px
    mb: 6, // ~50px
  }}
>
  {[
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' }
  ].map((item, index) => (
    <Box
      key={index}
      sx={{
        background: 'white',
        borderRadius: '12px',
        px: 1, // 20px
        py: 1.875, // 15px
         minWidth: { xs: '60px', sm: '90px', md: '120px' },
        boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
        textAlign: 'center',
      }}
    >
      {/* Number */}
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '24px', md: '32px' },
          color: '#551377',
          fontWeight: 'bold',
          lineHeight: 1.2,
          m: 0,
        }}
      >
        {item.value}
      </Typography>

      {/* Label */}
      <Typography
        sx={{
          fontSize: { xs: '8px', sm: '12px' },
          textTransform: 'uppercase',
          color: '#777',
        }}
      >
        {item.label}
      </Typography>
    </Box>
  ))}
</Box>

        <Stack
  direction="row"
  spacing={{ xs: 1, sm: 2 }} // gap between buttons: 8px on xs, 16px on sm+
  justifyContent="center"
  sx={{ mb: 4 }} // margin-bottom
>
  {['vendor', 'rider', 'customer'].map((tab) => (
    <Button
      key={tab}
      onClick={() => handleTabClick(tab)}
      variant={activeTab === tab ? 'contained' : 'outlined'}
      sx={{
        borderRadius: '30px',
        borderColor: '#551377',
        color: activeTab === tab ? 'white' : '#551377',
        backgroundColor: activeTab === tab ? '#551377' : 'transparent',
        fontWeight: 600,
        px: { xs: 2, sm: 3 }, // horizontal padding
        py: { xs: 1.5, sm: 1.5 }, // vertical padding
        textTransform: 'none',
        '&:hover': {
          backgroundColor: activeTab === tab ? '#551377' : '#f0f0f0',
        },
        fontSize: { xs: '0.75rem', sm: '0.875rem' } // responsive font size
      }}
    >
      {tab === 'vendor' ? 'Vendors' : tab === 'rider' ? 'Riders' : 'Customers'}
    </Button>
  ))}
</Stack>

          <div style={{
            background: 'white',
            maxWidth: '600px',
            margin: 'auto',
            padding: '30px',
            borderRadius: '16px',
            boxShadow: '0 15px 40px rgba(0,0,0,0.08)'
          }}>
            {/* Vendor Form */}
            {activeTab === 'vendor' && (
              <form onSubmit={handleSubmit}>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  marginBottom: '6px',
                  marginTop: '16px'
                }}>
                  Business Name *
                </label>
                <input 
                  name="businessName" 
                  value={formData.businessName || ''}
                  onChange={handleInputChange}
                  required 
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: errors.businessName ? '1px solid #ff4444' : '1px solid #ddd',
                    fontSize: { xs: '16px', md: '14px' }
                  }} 
                />
                {errors.businessName && (
                  <div style={{ color: '#ff4444', fontSize: '12px', marginTop: '4px' }}>
                    {errors.businessName}
                  </div>
                )}
                
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  marginBottom: '6px',
                  marginTop: '16px'
                }}>
                  Contact Person *
                </label>
                <input 
                  name="contactPerson" 
                  value={formData.contactPerson || ''}
                  onChange={handleInputChange}
                  required 
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: errors.contactPerson ? '1px solid #ff4444' : '1px solid #ddd',
                    fontSize: { xs: '16px', md: '14px' }
                  }} 
                />
                {errors.contactPerson && (
                  <div style={{ color: '#ff4444', fontSize: '12px', marginTop: '4px' }}>
                    {errors.contactPerson}
                  </div>
                )}
                
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  marginBottom: '6px',
                  marginTop: '16px'
                }}>
                  Email *
                </label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  required 
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: errors.email ? '1px solid #ff4444' : '1px solid #ddd',
                    fontSize: { xs: '16px', md: '14px' }
                  }} 
                />
                {errors.email && (
                  <div style={{ color: '#ff4444', fontSize: '12px', marginTop: '4px' }}>
                    {errors.email}
                  </div>
                )}
                
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  marginBottom: '6px',
                  marginTop: '16px'
                }}>
                  Phone Number *
                </label>
                <input 
                  name="phone" 
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                  required 
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: errors.phone ? '1px solid #ff4444' : '1px solid #ddd',
                    fontSize: { xs: '16px', md: '14px' }
                  }} 
                />
                {errors.phone && (
                  <div style={{ color: '#ff4444', fontSize: '12px', marginTop: '4px' }}>
                    {errors.phone}
                  </div>
                )}
                
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  marginBottom: '6px',
                  marginTop: '16px'
                }}>
                  Business Category
                </label>
                <select 
                  name="category" 
                  value={formData.category || 'Restaurant'}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1px solid #ddd',
                    fontSize: { xs: '16px', md: '14px' }
                  }}
                >
                  <option value="Restaurant">Restaurant</option>
                  <option value="Grocery">Grocery</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Other">Other</option>
                </select>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  style={{
                    marginTop: '25px',
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    border: 'none',
                    background: isSubmitting ? '#ccc' : '#fd8000',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSubmitting ? 'Processing...' : 'Join Vendor Waitlist'}
                </button>
              </form>
            )}

            {/* Rider Form */}
            {activeTab === 'rider' && (
              <form onSubmit={handleSubmit}>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  marginBottom: '6px',
                  marginTop: '16px'
                }}>
                  Full Name *
                </label>
                <input 
                  name="fullName" 
                  value={formData.fullName || ''}
                  onChange={handleInputChange}
                  required 
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: errors.fullName ? '1px solid #ff4444' : '1px solid #ddd',
                    fontSize: { xs: '16px', md: '14px' }
                  }} 
                />
                {errors.fullName && (
                  <div style={{ color: '#ff4444', fontSize: '12px', marginTop: '4px' }}>
                    {errors.fullName}
                  </div>
                )}
                
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  marginBottom: '6px',
                  marginTop: '16px'
                }}>
                  Email *
                </label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  required 
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: errors.email ? '1px solid #ff4444' : '1px solid #ddd',
                    fontSize: { xs: '16px', md: '14px' }
                  }} 
                />
                {errors.email && (
                  <div style={{ color: '#ff4444', fontSize: '12px', marginTop: '4px' }}>
                    {errors.email}
                  </div>
                )}
                
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  marginBottom: '6px',
                  marginTop: '16px'
                }}>
                  Phone Number *
                </label>
                <input 
                  name="phone" 
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                  required 
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: errors.phone ? '1px solid #ff4444' : '1px solid #ddd',
                    fontSize: { xs: '16px', md: '14px' }
                  }} 
                />
                {errors.phone && (
                  <div style={{ color: '#ff4444', fontSize: '12px', marginTop: '4px' }}>
                    {errors.phone}
                  </div>
                )}
                
                {/* <label style={{
                  display: 'block',
                  fontWeight: '600',
                  marginBottom: '6px',
                  marginTop: '16px'
                }}>
                  Vehicle Type
                </label>
                <select 
                  name="vehicle" 
                  value={formData.vehicle || 'Bike'}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1px solid #ddd',
                    fontSize: { xs: '16px', md: '14px' }
                  }}
                >
                  <option value="Bike">Bike</option>
                  <option value="Car">Car</option>
                </select> */}
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  style={{
                    marginTop: '25px',
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    border: 'none',
                    background: isSubmitting ? '#ccc' : '#fd8000',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSubmitting ? 'Processing...' : 'Join Rider Waitlist'}
                </button>
              </form>
            )}

            {/* Customer Form */}
            {activeTab === 'customer' && (
              <form onSubmit={handleSubmit}>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  marginBottom: '6px',
                  marginTop: '16px'
                }}>
                  Full Name *
                </label>
                <input 
                  name="fullName" 
                  value={formData.fullName || ''}
                  onChange={handleInputChange}
                  required 
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: errors.fullName ? '1px solid #ff4444' : '1px solid #ddd',
                    fontSize: { xs: '16px', md: '14px' }
                  }} 
                />
                {errors.fullName && (
                  <div style={{ color: '#ff4444', fontSize: '12px', marginTop: '4px' }}>
                    {errors.fullName}
                  </div>
                )}
                
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  marginBottom: '6px',
                  marginTop: '16px'
                }}>
                  Email *
                </label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  required 
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: errors.email ? '1px solid #ff4444' : '1px solid #ddd',
                    fontSize: { xs: '16px', md: '14px' }
                  }} 
                />
                {errors.email && (
                  <div style={{ color: '#ff4444', fontSize: '12px', marginTop: '4px' }}>
                    {errors.email}
                  </div>
                )}
                
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  marginBottom: '6px',
                  marginTop: '16px'
                }}>
                  Phone Number *
                </label>
                <input 
                  name="phone" 
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                  required 
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: errors.phone ? '1px solid #ff4444' : '1px solid #ddd',
                    fontSize: { xs: '16px', md: '14px' }
                  }} 
                />
                {errors.phone && (
                  <div style={{ color: '#ff4444', fontSize: '12px', marginTop: '4px' }}>
                    {errors.phone}
                  </div>
                )}
                
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  marginBottom: '6px',
                  marginTop: '16px'
                }}>
                  Location
                </label>
                <input 
                  name="location" 
                  value={formData.location || ''}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1px solid #ddd',
                    fontSize: { xs: '16px', md: '14px' }
                  }} 
                />
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  style={{
                    marginTop: '25px',
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    border: 'none',
                    background: isSubmitting ? '#ccc' : '#fd8000',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSubmitting ? 'Processing...' : 'Join Customer Waitlist'}
                </button>
              </form>
            )}
          </div>

          <footer style={{
            textAlign: 'center',
            marginTop: '80px',
            fontSize: { xs: '16px', md: '14px' },
            color: '#666'
          }}>
            © 2026 Rine. Powered by Gabrine Solutions.
          </footer>
        </div>
      </div>
    </>
  );
}
