import React from 'react';
import {Box, CircularProgress} from '@mui/material';

interface LoaderProps {
  /**
   * What color to use
   */
  color?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
}

/**
 * Primary UI component for user interaction
 */
const Loader: React.FC<LoaderProps> = ({
  size = 'medium',
  color,
  loading = false,
}: LoaderProps) => {
  return loading ? (
    <Box
      sx={{
        display: 'flex',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}>
      <CircularProgress />
    </Box>
  ) : null;
};

export default Loader;
