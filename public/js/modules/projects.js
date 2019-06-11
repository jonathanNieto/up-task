// ES6 Modules or TypeScript
import Swal from 'sweetalert2';
import axios from 'axios';

const btnDeleteProject = document.querySelector("#delete-project");

if (btnDeleteProject) {
    btnDeleteProject.addEventListener('click', (e) => {
        const projectUrl = e.target.dataset.projectUrl;
        /* console.log('click en eliminar', projectUrl); */
        Swal.fire({
            title: '¿Deseas borrar este proyecto?',
            text: "Un proyecto eleminado no se puede recuperar.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar',
            cancelButtonText: 'No, Cancelar'
        }).then((result) => {
            if (result.value) {
                /* enviar peticion a axios */
                const url = `${location.origin}/project/${projectUrl}`;
                axios.delete(url, { params: { projectUrl } })
                    .then((resp) => {
                        console.log({ resp });
                        Swal.fire({
                            title: 'Eliminado!',
                            text: resp.data,
                            type: 'success',
                            showConfirmButton: false,
                            timer: 2000
                        });

                        setTimeout(() => {
                            window.location.href = '/';
                        }, 2500);
                    })
                    .catch((err) => {
                        Swal.fire({
                            type: 'error',
                            title: 'Hubo un error',
                            text: 'No se pudo eliminar el proyecto',
                            showConfirmButton: false,
                            timer: 2000
                        });
                    });
            }
        })
    });
}

export default btnDeleteProject;