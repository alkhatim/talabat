import toast from "toastr";

toast.options.positionClass = "toast-bottom-left";

const error = (error) => {
  if (typeof error === "string") {
    return toast.error(error);
  }

  if (typeof error === "object") {
    if (error.response) {
      return toast.error(error.response.data);
    } else if (error.message) {
      return toast.error(error.message);
    } else return toast.error(error);
  }
};

const warn = (message) => {
  toast.warning(message);
};

const info = (message) => {
  toast.info(message);
};

const success = (message) => {
  toast.success(message);
};

export default {
  error,
  warn,
  info,
  success,
};
