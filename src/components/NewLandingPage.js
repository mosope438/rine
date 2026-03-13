import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Box, Typography, Button, Stack } from '@mui/material';
import AuthModal from 'components/auth/AuthModal';
import { getToken } from 'helper-functions/getToken';

const MapModal = dynamic(() => import('components/Map/MapModal'), { ssr: false });

const NewLandingPage = () => {
  const router = useRouter();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [modalFor, setModalFor] = useState('sign-in');
  const token = getToken();

  // When logged in, redirect to home (ZoneGuard allows logged-in users through even without zone)
  useEffect(() => {
    if (token) {
      router.replace('/home');
    }
  }, [token, router]);

  const handleWaitlistClick = () => {
    router.push('/waitlist');
  };

  const handleOpenSignIn = () => {
    setModalFor('sign-in');
    setAuthModalOpen(true);
  };

  const handleOpenSignUp = () => {
    setModalFor('sign-up');
    setAuthModalOpen(true);
  };

  const handleAuthClose = () => {
    setModalFor('sign-in');
    setAuthModalOpen(false);
  };

  const handleMapModalClose = () => {
    setMapModalOpen(false);
    // If they set location, they can now go to home
    if (typeof window !== 'undefined' && localStorage.getItem('zoneid') && localStorage.getItem('location')) {
      router.replace('/home');
    }
  };

  // Show nothing while redirecting logged-in user
  if (token) {
    return null;
  }

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
      {/* Top bar: Set delivery location centered, auth buttons on the right */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: { xs: 56, md: 64 },
          display: 'flex',
          alignItems: 'center',
          px: { xs: 2, md: 3 },
        }}
      >
        <Button
          onClick={() => setMapModalOpen(true)}
          variant="outlined"
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#551377',
            borderColor: '#551377',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': {
              borderColor: '#551377',
              backgroundColor: 'rgba(85, 19, 119, 0.08)',
            },
          }}
        >
          Set delivery location
        </Button>
        <Stack
          direction="row"
          spacing={2}
          sx={{ marginLeft: 'auto' }}
        >
          <Button
            onClick={handleOpenSignIn}
            variant="outlined"
            sx={{
              color: '#551377',
              borderColor: '#551377',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                borderColor: '#551377',
                backgroundColor: '#551377',
                color: 'white',
              },
            }}
          >
            Sign In
          </Button>
          <Button
            onClick={handleOpenSignUp}
            variant="contained"
            sx={{
              backgroundColor: '#551377',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#441066',
              },
            }}
          >
            Sign Up
          </Button>
        </Stack>
      </Box>

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
            mb: { xs: 4, md: 4 },
            mt: { xs: 0, md: 4 },
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
              xs: '0.5rem',
              md: '0.75rem',
            },
            fontSize: { xs: '1rem', md: '1.2rem' },
            width: {
              xs: '100%',
              md: '400px',
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

      {mapModalOpen && (
        <MapModal
          open={mapModalOpen}
          handleClose={handleMapModalClose}
        />
      )}

      <AuthModal
        modalFor={modalFor}
        setModalFor={setModalFor}
        open={authModalOpen}
        handleClose={handleAuthClose}
        primaryColor="#551377"
      />
    </Box>
  );
};

export default NewLandingPage;
