

// get element by Id
const postContainer = document.getElementById('post-container');
const displayTitle = document.getElementById('display-title-view');
const DisplayMarkRead = document.getElementById('mark-read');
const latestPostContainer = document.getElementById('latest-post');
const loadingSpinner = document.getElementById('loading-spinner');
const errorElement = document.getElementById('error-element');






let markRead = 0;



// Load All Posts
const loadAllPosts = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const posts = data.posts;

    posts.forEach((post) => {

        let active = '';
        if (post.isActive) {
            active = `<img class="absolute top-2 right-3" src="images/icons/Status.png" alt="">`
        }
        else {
            active = `<img class="absolute top-2 right-3" src="images/icons/Status (1).png" alt="">`
        }
        // console.log(post);
        const div = document.createElement('div');
        div.innerHTML = `
        <!-- card 1 -->
        <div class="bg-[#f3f3f4] flex p-6 gap-1 lg:flex-row flex-col rounded-lg">
            <!-- img and active icon -->
            <div class="relative lg:w-[40%] mx-auto p-4">
                <img src="${post.image}" alt="" class="w-full rounded-md">
                ${active}
                
            </div>

            <!-- everything text -->
            <div class="p-4 space-y-5">

                <p class="flex gap-6 text-sm font-medium">#${post.category}<span class="font-medium">Author :  ${post.author.name}</span></p>

                <p class="text-base  font-semibold">${post.title}</p>

                <p class="text-sm">${post.description}</p>
                <p><img src="images/icons/Line 1.png" alt=""></p>

                <div class="flex justify-between items-center ">
                    <div class="flex gap-6">
                        <p class="flex gap-1  items-center"><img
                                src="images/icons/tabler-icon-message-2.png" alt=""> <span>${post.comment_count}</span></p>
                        <p class="flex gap-1  items-center"><img src="images/icons/tabler-icon-eye.png"
                                alt="">
                            <span>${post.view_count}</span>
                        </p>
                        <p class="flex gap-1  items-center"><img
                                src="images/icons/tabler-icon-clock-hour-9.png" alt=""> <span> ${post.posted_time}</span> min</p>
                    </div>
                    <div class="ml-4 lg:ml-0">
                        <button onclick=" displayTitleView('${post.title}','${post.view_count}')"> <img src="images/icons/Group 40106.png" alt=""></button>
                    </div>
                </div>



            </div>


        </div>
        
        `

        postContainer.appendChild(div);
    })

}


// display title and view
const displayTitleView = (title, view) => {
    markRead = markRead + 1;
    DisplayMarkRead.innerText = markRead;
    const div = document.createElement('div');
    div.innerHTML = ` 
    <div  class="flex justify-between items-center shadow-xl p-2 rounded-lg bg-white">
    <p id="display-title">${title}</p>
     <p class="flex gap-2 p-6"><img src="images/icons/tabler-icon-eye.png"
             alt=""><span>${view}</span></p>
 </div>  
    `
    displayTitle.appendChild(div);

}


// load Latest post

const loadLatestPost = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    data.forEach((post) => {
        // console.log(post);
        const div = document.createElement('div');
        div.innerHTML = `
        <!-- card 1 -->
        <div class="bg-base-100 shadow-xl p-5 space-y-4 rounded-lg">
            <figure><img class="rounded-sm" src="${post.cover_image}" alt="Shoes" /></figure>
            <div class="space-y-4 ">
                <p class="flex gap-2"><img src="images/icons/Frame.png" alt="">
                     <span>${post.author.posted_date || 'No Publish Date'}</span>
                </p>
              <h2 class="text-lg font-semibold ">${post.title}</h2>
              <p class="text-sm ">${post.description.slice(0, 90)}</p>
              <div class="flex gap-5 items-center ">
                <div  class="w-[15%] ">
                    <img src="${post.profile_image}" alt="" class="w-[100%] rounded-full">
                </div>
                <div>
                    <p class="text-base font-semibold">${post.author.name}</p>
                    <p class="text-sm">${post.author.designation || 'Unknown'}</p>
                </div>
              </div>
              
            </div>
          </div>
        
        
        `
        latestPostContainer.appendChild(div);

    })

}


// handle search
const handleSearch = async () => {
    const inputField = document.getElementById('input-field');
    const search = inputField.value;
    // postContainer.innerHTML = '';
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${search}`);
    const data = await res.json();
  
   
    postContainer.innerHTML= '';
    if(data.posts.length === 0){
        errorElement.classList.remove('hidden');

    }
    else{
        errorElement.classList.add('hidden');

    }
    data.posts.forEach((post)=>{
      
        let active = '';
        if (post.isActive) {
            active = `<img class="absolute top-2 right-3" src="images/icons/Status.png" alt="">`
        }
        else {
            active = `<img class="absolute top-2 right-3" src="images/icons/Status (1).png" alt="">`
        }
        const div = document.createElement('div');
        div.innerHTML = `
        <!-- card 1 -->
        <div class="bg-[#f3f3f4] flex p-6 gap-1 lg:flex-row flex-col rounded-lg">
            <!-- img and active icon -->
            <div class="relative lg:w-[40%] mx-auto p-4">
                <img src="${post.image}" alt="" class="w-full rounded-md">
                ${active}
                
            </div>

            <!-- everything text -->
            <div class="p-4 space-y-5">

                <p class="flex gap-6 text-sm font-medium">#${post.category}<span class="font-medium">Author :  ${post.author.name}</span></p>

                <p class="text-base  font-semibold">${post.title}</p>

                <p class="text-sm">${post.description}</p>
                <p><img src="images/icons/Line 1.png" alt=""></p>

                <div class="flex justify-between items-center ">
                    <div class="flex gap-6">
                        <p class="flex gap-1  items-center"><img
                                src="images/icons/tabler-icon-message-2.png" alt=""> <span>${post.comment_count}</span></p>
                        <p class="flex gap-1  items-center"><img src="images/icons/tabler-icon-eye.png"
                                alt="">
                            <span>${post.view_count}</span>
                        </p>
                        <p class="flex gap-1  items-center"><img
                                src="images/icons/tabler-icon-clock-hour-9.png" alt=""> <span> ${post.posted_time}</span> min</p>
                    </div>
                    <div>
                        <button onclick=" displayTitleView('${post.title}','${post.view_count}')"> <img src="images/icons/Group 40106.png" alt=""></button>
                    </div>
                </div>



            </div>


        </div>
        
        `

        postContainer.appendChild(div);
      
        
    });



    if(handleSearch){
        // load spinner 2 second
    loadingSpinner.classList.remove('hidden');
    const stop = setInterval(()=>{
    
       }, 0);
    
       setTimeout(() => {
        clearInterval(stop);
        loadingSpinner.classList.add('hidden');
       
       }, 2000);
   }
  

}




loadAllPosts();
loadLatestPost();
handleSearch(click);