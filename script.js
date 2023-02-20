var $ = function(e){
    "use strict";
    return window.document.getElementById(e);
}

// CREATE AN ARRAY OF EMPLOYEES
let arrEmployees = [
    [1, "Siva Sai Teja", 1234, "sivagadiparthi1357@gmail.com", "Administrative"],
    [2, "lokesh", 3456, "lokesh456@gmail.com", "Engineering"],
    [3, "Puneeth", 9990, "puneeth01@gmail.com", "Marketing"],
    [4, "albin", 8890, "albin@gmail.com", "Quality Assurance"],
    [5, "rehan", 8970, "rehan07@gmail.com", "Executive"]
]

if (localStorage.getItem('employees') !== null) {
    arrEmployees = JSON.parse(localStorage.getItem('employees'))
}


let form        = $('addForm')
let empTable    = $('empTable')
let empCount    = $('empCount')

buildGrid()

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let empID       = parseInt($('id').value)
    let name     = $('name').value
    let extention    = parseInt($('extension').value)
    let email    = $('email').value
    let department   = $('department').value
    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
    let arrNewEmployee = [empID, name, extention, email, department]
    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    arrEmployees.push(arrNewEmployee)
    // BUILD THE GRID
    buildGrid()
    // RESET THE FORM
    form.reset()
    // SET FOCUS BACK TO THE ID TEXT BOX
    form.id.focus()
})

empTable.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        // CONFIRM THE DELETE
        if (confirm('Are you sure you want to delete this employee?')) {
            // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
            let rowIndex = e.target.parentNode.parentNode.rowIndex
            // REMOVE EMPLOYEE FROM ARRAY
            arrEmployees.splice(rowIndex - 1, 1)
            // BUILD THE GRID
            buildGrid()
        }
    }
})

function buildGrid() {
    empTable.lastElementChild.remove()
    let tbody = document.createElement('tbody')
    for (let employee of arrEmployees) {
        tbody.innerHTML += 
        `
        <tr>
            <td>${employee[0]}</td>
            <td>${employee[1]}</td>
            <td>${employee[2]}</td>
            <td>${employee[3]}</td>
            <td>${employee[4]}</td>
            <td><button class="btn btn-sm btn-danger delete">X</button></td>
        </tr>
        `
    }
    empTable.appendChild(tbody)
    empCount.value = `(${arrEmployees.length})`
    localStorage.setItem('employees', JSON.stringify(arrEmployees))
}