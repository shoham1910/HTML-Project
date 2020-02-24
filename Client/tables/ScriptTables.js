let usersData;
window.onload=()=>{
    loadUsersData(usersData);
};
function loadUsersData(usersData){
    const usersTableBody=document.getElementById('usersTable');
    let usersDataHtml='';
    for(let user of usersData){
        usersDataHtml+=`<tr><td>${user.Username}</td>${user.Password}<td></td></tr>`;
    }
    usersTableBody.innerHTML=usersDataHtml;
}