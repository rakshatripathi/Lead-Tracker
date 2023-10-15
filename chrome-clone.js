
let myLeads = []
let oldLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
//get the leads from the local storage - ps:json.parse()
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

// check if leadsFromStorage is truthy
// if so, set myLeads to its value and call renderLead()
if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click",function(){
    //grab the url of current tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
    
})

function render(leads){
    // a variable,listitems, to hold all the html for the list items and assigning it with empty string to begin with
    let listitems = " "
   
    // logs out the items in the myleads array using a for loop
    for(let i = 0 ; i <leads.length ; i++)
    {
        
    // using template strings
       listitems += `
       <li>
           <a target = '_blank' href='${leads[i]}'>
               ${leads[i]} 
           </a>
       </li>`
    }

    // render the listitems inside the unordered list using ulEl.innerHTML
    ulEl.innerHTML = listitems
}

deleteBtn.addEventListener("dblclick", function(){
    console.log("double clicked!")
    localStorage.clear()
    myLeads =[]
    render(myLeads)
})

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    // clear out the input field
    inputEl.value = ' ';
    // save the myLeads array to localstorage
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)

    console.log(localStorage.getItem(myLeads))
})

