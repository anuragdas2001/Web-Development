{
    //Method to submit the form data for new post using AJAX
    let createPost= function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(event){

            event.preventDefault();
            $.ajax({
                type:'post',
                url:'/posts/create-post',
                data: newPostForm.serialize(),//converts form data to JSON
                success:function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($('.delete-post-button' ,newPost));
                    // call the create comment class
                    new PostComments(data.data.post._id);

                    // CHANGE :: enable the functionality of the toggle like button on the new post
                    new ToggleLike($(' .toggle-like-button', newPost));

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                },error:function(error){
                    console.log(error.responseText);
                }
            })

        })

        
    }
    //Method to create a post in DOM
    let newPostDom = function(post){
        return $(`

            <li id="post-${post.id}">
                <p>
                 
                <small>
                    <a class="delete-post-button" href="/posts/delete/${post._id}">X</a>
                </small>
        
              <small>${post.user.name}</small>
              <br />
              ${post.content}
              <br>
              <small>
                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=$(post._id)&type=Post">
                    0 Likes
                </a>
            </small> 
            </p>
           

            
            
        
            <div class="post-comments">
        
                    <form action="/comments/create" id="new-comment-form" method="POST">
                        <input type="text" name="content" placeholder="Type your comment" required>
                        <input type="hidden" name="post" value="${post._id}">
                        <input type="submit" value="Add Comment">
                    </form>
                    
        
                   
        
                    <div class="comments-list">
                        <ul id="post-comments-${post._id}">
                            
                          
                           
                        </ul>
                    </div>
        
                   
            </div>
            </li>`)
    }

    //Method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(event){
            event.preventDefault();

            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    $(`#post-${data.post_id}`).remove();

                },error:function(error){
                    console.log(error.responseText);
                }


            });
        });
    }



    createPost();
}