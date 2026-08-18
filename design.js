
const username = document.getElementById("username");

const btn = document.getElementById("searchBtn");

const avatar = document.querySelector(".avatar");

const name = document.querySelector(".name");

const bio = document.querySelector(".bio");

const followers = document.querySelector(".followers");

const following = document.querySelector(".following");

const repos = document.querySelector(".repos");
    
const historyList = document.querySelector(".history-list");  

const load = document.querySelector('.loader');    

const profile = document.querySelector('.profile-card');
    
const history = document.querySelector('.history');
    
const recent = document.querySelector('.recents');

const profileBtn = document.querySelector('.githubLink a');

const status = document.querySelector('.status');







window.addEventListener('online', () => {
  status.innerHTML = '<p>Back online, keep up the good work!</p>';
  
  status.classList.remove('offline');
  status.classList.add('online');
  
  setTimeout(() => {
      
      status.classList.remove('online');
  },5000)
});





window.addEventListener('offline', () => {
  
  status.innerHTML = '<p>No connection, please check your network settings</p>';
  
  status.classList.remove('online');
  status.classList.add('offline');
  
  setTimeout(() => {
      
      status.classList.remove('offline');
  },5000)
  
});






btn.addEventListener('click', searchUser);
    
    clearList();
    
    username.addEventListener('keydown',(e) => {
        
        if (e.key === 'Enter') {
                        
              searchUser();        
              
        }
        
    });
    
    
    
    function updateHistory(val) {
    
    
    
        historyList.innerHTML += `<button class="history-item">${val} </button>`;
        
        const items = document.querySelectorAll('.history-item');
        
        items.forEach(item => {
        
        
        item.addEventListener('click',() => {
            
            username.value = item.textContent;
            
            searchUser();
            
        });
            
        
    
    });
    }
    
    
    
    
    function clearList(){
        
        const deleteBtn = document.createElement('button');
        
        
        recent.appendChild(deleteBtn);
        deleteBtn.innerHTML = `<i class="fa-solid fa-trash-alt"></i> `;
        
        deleteBtn.addEventListener('click',() => {
            
            localStorage.removeItem('gitHistory');
            
            history.innerHTML = '';
            
            history.classList.remove('active');
            
            
            
        });
    }
    
    
    
    function savedHistory(val) {
        let history = JSON.parse(localStorage.getItem('gitHistory')) || [];
        
        if (!history.includes(val)) {
            history.push(val);
        }
        
               
        
        localStorage.setItem('gitHistory',JSON.stringify(history));
    }
    
    
    
    function loadHistory() {

    historyList.innerHTML = '';

    const history = JSON.parse(localStorage.getItem("gitHistory")) || [];
        
        
        history.forEach(username => {
            updateHistory(username);
            
        });
        

    }
    
    
    
    
    

    
    
    
    async function searchUser() {
    
                
    
    let val = username.value.trim();
    
   
    
        
    
    if (!val) {
         alert(' Please provide a GitHub username...');
         return;
    }
    
    
    
    
    try{
    
    
    btn.innerHTML = '<i class="fa-solid fa-hourglass"></i> ';
        btn.disabled = true;
        
        load.classList.add('active');
        profile.classList.remove('active');
        
      const data = await getUser(val);
      
        updateHistory(val);
        savedHistory(val);
        
        avatar.src = data.avatar_url;
        name.textContent = data.name || 'Unknown';
        bio.textContent = data.bio || 'No bio' ;
        followers.textContent = data.followers;
        
        repos.textContent = data.public_repos;
        following.textContent = data.following;
        
        profileBtn.href = data.html_url;
        
    } 
    
    catch (error){
    
    
    
    alert(error)

        
        load.classList.remove('active');
        profile.classList.remove('active');
    }
    
    
    
    
    
    
    finally{
    
        btn.innerHTML = '<i class="fa-solid fa-search"></i> ';
        btn.disabled = false;
        
        load.classList.remove('active');
        profile.classList.add('active');
        
        username.addEventListener('focus',() => {
            username.value = '';
            
            history.classList.add('active');
        });
        
    }
    
    loadHistory();
    
    
    }









async function getUser(val) {
       
       const apiUrl = `https://api.github.com/users/${val}`;
       
       const res = await fetch(apiUrl);
       
       
       if (!res.ok) {
           throw new Error('User not found!');

       }
       
       const data = await res.json();
       
       
       
     return data;
}
