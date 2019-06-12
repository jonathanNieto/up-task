import Swal from 'sweetalert2';

export const updateProgress = () => {
  /* seleccionar las tareas ecistentes */ 
  const tasks =  document.querySelectorAll('li.task');

  console.log({tasks});

  if (tasks.length) {
      /* seleccionar las tareas completadas */
      const completedTasks =  document.querySelectorAll('i.text-success');
      console.log({completedTasks});
      /* calcular el avance */
      const progress = Math.round((completedTasks.length / tasks.length) * 100);
      /* mostrar el avance */
      const progressBar = document.querySelector('#progress-bar');
      console.log({progressBar});
      progressBar.style.width = progress+'%';

      if (progress === 100) {
        Swal.fire({
            title: 'Proyecto completado!',
            text: 'Completaste el proyecto',
            type: 'success',
            showConfirmButton: false,
            timer: 2000
        });
      }
  }
};