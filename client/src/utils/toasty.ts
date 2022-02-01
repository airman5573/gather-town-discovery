import { toast, ToastOptions } from 'react-toastify';

const defaultToastOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 4500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

const toasty = {
  info: (message: string) => toast.info(message, defaultToastOptions),
  success: (message: string) => toast.success(message, defaultToastOptions),
  warning: (message: string) => toast.warning(message, defaultToastOptions),
  error: (message: string) => toast.error(message, defaultToastOptions),
};

export default toasty;
