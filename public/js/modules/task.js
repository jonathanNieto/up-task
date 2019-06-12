import Axios from "axios";
import Swal from 'sweetalert2';
import { updateProgress } from '../functions/progress-bar'



const tasks = document.getElementById('pending-list');

if (tasks) {
    tasks.addEventListener('click', (e) => {
        if (e.target.classList.contains('fa-check-circle')) {
            const icon = e.target;
            const taskId = icon.parentElement.parentElement.parentElement.dataset.task;

            /* request hacia /task/:id */
            const url = `${location.origin}/task/${taskId}`;
            Axios.patch(url, { taskId })
                .then((result) => {
                    if (result.status === 200) {
                        icon.classList.toggle('text-success');
                        /* update progress */
                        updateProgress();
                    }
                }).catch((err) => {
                    console.log(err);
                });
        }

        if (e.target.classList.contains('fa-trash-alt')) {
            const taskHTML = e.target.parentElement.parentElement.parentElement,
                taskId = taskHTML.dataset.task;
            Swal.fire({
                title: '¿Deseas borrar esta tarea?',
                text: "Una tarea eleminada no se puede recuperar.",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Borrar',
                cancelButtonText: 'No, Cancelar'
            }).then((result) => {
                if (result.value) {
                    /* enviar peticion a axios */
                    const url = `${location.origin}/task/${taskId}`;
                    Axios.delete(url, { params: { taskId } })
                        .then((resp) => {
                            console.log({ resp });
                            if (resp.status === 200) {
                                /* eliminar tarea del dom */
                                taskHTML.parentElement.removeChild(taskHTML)
                                /* notificar */
                                Swal.fire({
                                    title: 'Eliminada!',
                                    text: resp.data,
                                    type: 'success',
                                    showConfirmButton: false,
                                    timer: 2000
                                });
                                /* update progress */
                                updateProgress();
                            }
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
        }
    });
}

export default tasks;