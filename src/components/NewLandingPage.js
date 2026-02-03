import React from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Button } from '@mui/material';

const NewLandingPage = () => {
  const router = useRouter();

  const handleWaitlistClick = () => {
    router.push('/waitlist');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#F4FFFF',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: { xs: '2rem', md: '4rem' },
      }}
    >
      {/* Image at the top */}
      <Box
        component="img"
        src="/rine_landing_page.jpeg"
        alt="Rine Platform"
        sx={{
          width: { xs: '280px', md: '700px' },
          height: { xs: '220px', md: '400px' },
          objectFit: 'cover',
          borderRadius: '20px',
          marginBottom: '3rem',
          boxShadow: '0 10px 30px rgba(85, 19, 119, 0.15)',
        }}
      />
      
      {/* Main content */}
      <Box
        sx={{
          maxWidth: '800px',
          color: '#2b2b2b',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.3rem', md: '2rem' },
            fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
            fontWeight: 'bold',
            marginBottom: '2rem',
            lineHeight: 1.4,
            color: '#551377',
           mb: { xs: 4, md: 4 }, // spacing scale (theme.spacing)
    mt: { xs: 0, md: 4 },
            // textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
          }}
        >
          We're building a vertically integrated commerce operating system for African businesses.
        </Typography>
        
        <Button
          onClick={handleWaitlistClick}
          variant="contained"
          size="large"
          sx={{
            backgroundColor: '#fd8000',
            color: 'white',
           py: {
      xs: '0.5rem', // padding-top & padding-bottom on mobile
      md: '0.75rem',
    },
            fontSize: { xs: '1rem', md: '1.2rem' },
            width: {
      xs: '100%',   // full-width on mobile
      md: '400px',  // fixed on desktop
    },
            fontWeight: 'bold',
            borderRadius: '50px',
            textTransform: 'none',
            boxShadow: '0 4px 20px rgba(253, 128, 0, 0.4)',
            '&:hover': {
              backgroundColor: '#e67300',
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 25px rgba(253, 128, 0, 0.6)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Join Waitlist
        </Button>
      </Box>
    </Box>
  );
};

export default NewLandingPage;
