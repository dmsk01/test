import CloseIcon from '@mui/icons-material/Close';
import { Dialog, IconButton, DialogTitle, DialogContent } from '@mui/material';

import { CoinExpandedInfo } from './coin-expanded-info';

import type { CoinInfo } from './coin-card';

type CoinDetailsDialogProps = {
  open: boolean;
  onClose: () => void;
  coin: CoinInfo;
};

export const CoinDetailsDialog = ({ open, onClose, coin }: CoinDetailsDialogProps) => (
    <Dialog fullScreen open={open} onClose={onClose}>
      <DialogTitle sx={{ fontSize: '28px' }}>
        {coin.coin}
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{ position: 'absolute', right: 22, top: 22 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <CoinExpandedInfo coin={coin} />
      </DialogContent>
    </Dialog>
  );
