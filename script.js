document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('workoutForm');
    const tableBody = document.getElementById('workoutTable').getElementsByTagName('tbody')[0];
    const totalCaloriesElement = document.getElementById('totalCalories');
    let workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    
    const updateTotalCalories = () => {
        const totalCalories = workouts.reduce((sum, workout) => sum + parseInt(workout.calories), 0);
        totalCaloriesElement.textContent = totalCalories;
    };
    
    const renderWorkouts = () => {
        tableBody.innerHTML = '';
        workouts.forEach((workout, index) => {
            const newRow = tableBody.insertRow();
            newRow.innerHTML = `
                <td>${workout.exercise}</td>
                <td>${workout.duration}</td>
                <td>${workout.calories}</td>
                <td class="actions">
                    <button onclick="editWorkout(${index})">Edit</button>
                    <button onclick="deleteWorkout(${index})">Delete</button>
                </td>
            `;
        });
        updateTotalCalories();
    };
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const exercise = document.getElementById('exercise').value;
        const duration = document.getElementById('duration').value;
        const calories = document.getElementById('calories').value;
        
        if (exercise === '' || duration === '' || calories === '') {
            alert('Please fill out all fields');
            return;
        }
        
        workouts.push({ exercise, duration, calories });
        localStorage.setItem('workouts', JSON.stringify(workouts));
        
        form.reset();
        renderWorkouts();
    });
    
    window.editWorkout = (index) => {
        const workout = workouts[index];
        document.getElementById('exercise').value = workout.exercise;
        document.getElementById('duration').value = workout.duration;
        document.getElementById('calories').value = workout.calories;
        
        workouts.splice(index, 1);
        localStorage.setItem('workouts', JSON.stringify(workouts));
        renderWorkouts();
    };
    
    window.deleteWorkout = (index) => {
        if (confirm('Are you sure you want to delete this workout?')) {
            workouts.splice(index, 1);
            localStorage.setItem('workouts', JSON.stringify(workouts));
            renderWorkouts();
        }
    };
    
    renderWorkouts();
});
