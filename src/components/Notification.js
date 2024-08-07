import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const showAlert = (icon, title, text) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        icon: icon, // Mesaj türüne göre ikonu ayarlayın
        title: title,
        position: 'top-end',
        timer: 1500,
        text: text,
        showConfirmButton: false,
        buttonsStyling: false,
        customClass: {
            // Özel CSS sınıfını burada ekleyin
            icon: 'custom-icon',
            title: 'custom-title',
            text: 'custom-text',
        },
    });
};
