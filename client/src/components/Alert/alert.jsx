import { Toaster, toast } from "react-hot-toast"

<Toaster
  position="top-center"
  reverseOrder={false}
/>

export const alertSuccess = (text) => {
    
    toast.success(text, {
        style: {
           backgroundColor: "#fffff",
           color: "#000000",
        },
        
    });

}

export const alertError = (text) => {

    toast.error(text, {
        style: {
            backgroundColor: "#fffff",
           color: "#000000",
        },
        
    });
}