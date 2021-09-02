var tasks = [];
var currentTime = moment().format("H")
var today = moment().format("LL");
document.getElementById("currentDay").innerText = today;

// Checks the current time and updates the colors of each time block
function hourUpdate() {
    for(var i = 1; i < 10; i++) {
        var x = i + 8;
        if(currentTime > x) {
            $(`#row${i} textarea`).addClass("bg-secondary")
        } else if(currentTime < x) {
            $(`#row${i} textarea`).addClass("bg-info")
        } else {
            $(`#row${i} textarea`).addClass("bg-success")
        }
    }
};

// Reset the page
function reset() { 
    tasks = [];
    localStorage.setItem("tasks", JSON.stringify(tasks));
    location.reload();
};

// Populate data back into textarea
function createData(text, time) {
    var x = time - 8;
    $(`#row${x} textarea`).val(text);
};

// Saving to tasks to local storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Loads the data from local storage to the tasks array
function loadData() {
    tasks = JSON.parse(localStorage.getItem("tasks"));

    if(!tasks) {
        tasks = [];
    }

    for(var i = 0; i < tasks.length; i++){
        createData(tasks[i].text, tasks[i].time)
    }
};

// Save button is clicked
$(".savebtn").click(function(){
    var taskText = $(this).siblings('textarea').val();
    var taskTime = $(this).siblings('p').text();

    tasks.push({
        text: taskText,
        time: taskTime
    })

    saveTasks();
});

loadData();
hourUpdate();
setInterval(function(){hourUpdate()}, (1000*60));