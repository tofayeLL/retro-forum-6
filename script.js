

// get element by Id
const postContainer = document.getElementById('post-container');
const displayTitle = document.getElementById('display-title-view');
const DisplayMarkRead = document.getElementById('mark-read');





let markRead = 0;

const loadAllPosts = async()=>{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const posts = data.posts;
    posts.forEach((post)=>{
        let active = '';
        if(post.isActive){
        active = `<img class="absolute top-2 right-3" src="images/icons/Status.png" alt="">`
        }
        else{
            active = `<img class="absolute top-2 right-3" src="images/icons/Status (1).png" alt="">`
        }
        console.log(post);
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

                <p class="flex gap-6 text-sm font-medium">#${post.category} <span class="font-medium">Author :  ${post.author.name}</span></p>

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
    })
    
}


const displayTitleView = (title,view)=>{ 
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







loadAllPosts();