import React from 'react'
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import Error404 from '../../assets/Svg/error_404.svg'
import HomeIcons from '../../assets/Home'

const ErrorPage = () => {
    const navigation = useNavigate()

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'var(--sky-blue-100)',
                flexDirection: 'column'
            }}
        >
            <img src={Error404} alt="404" width={700} height={700} />
            <Box
                sx={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: 'var(--royal-purple-300)',
                    mt: 5,
                    cursor: 'pointer',
                    '&:hover': {
                        color: 'var(--royal-purple-300)'
                    },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    flexDirection: 'column'
                }}
                onClick={() => {
                    navigation('/')
                }}
            >
                <HomeIcons width={35} height={35} />
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'sans-serif',
                        fontSize: 12,
                        fontWeight: 600,
                        color: 'var(--royal-purple-300)',
                        '&:hover': {
                            color: 'var(--royal-purple-300)'
                        }
                    }}>
                    Back to home
                </Box>
            </Box>
        </Box>
    )
}

export default ErrorPage
