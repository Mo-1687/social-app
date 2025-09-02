import Swal from "sweetalert2";
function Alert(title, text, icon) {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: "OK",

    customClass: {
      popup: "card-enhanced glass-effect text-foreground",
    },
  });
}

export default Alert;
