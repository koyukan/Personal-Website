// console.log($("h1").html("Memeler"));


// $(document).keypress(function (event) { $("h1").html($("h1").html() + event.key) })

$("#searchButton").click(function () { getInstagramPictures($("#userName").val()) });

// $("h1").css("color", "red");

$("h1").addClass("header cursive");
$("h1").hasClass("cursive");
// $("h1").removeClass("header")
$("h1").text("Bye")
$("h1").html("<em>InstaMeter</em>")
$("img").attr("src", "/media/elon.jpg")
$("img").addClass("border");
$("section").append(`<p></p>`);
$("section").append(`<p></p>`);
// $("section").hide();
$("body").keypress(function (event) { if (event.key === "t") { $("section").toggle(); } })
$("section").show();
$("h1").fadeOut();
$("h1").fadeIn().slideUp().slideDown().animate({margin: 50});

$("body").keypress(function (event) { if (event.key === "t") { $("h1").fadeToggle(); } })

console.log($("img").hasClass("border"));





//Returns an array of all user info + an array of all photos

async function getInstagramPictures(profileName) {
    
    const baseUrl = "https://www.instagram.com";
    const profileUrl = `${baseUrl}/${profileName}`;
    const jsonDataUrl = `${profileUrl}/?__a=1`;
    const queryHash = "003056d32c2554def87228bc3fd9668a"

    
    console.log("Hello");
    const response = await fetch(jsonDataUrl);
    console.log(response);
    const jsonData = await response.json();
    console.log("Hello3")
    console.log(jsonData);

    var morePages = jsonData.graphql.user.edge_owner_to_timeline_media.page_info.has_next_page;
    var endCursor = jsonData.graphql.user.edge_owner_to_timeline_media.page_info.end_cursor;
    const userId = jsonData.graphql.user.id;
    
    
    var pictures = jsonData.graphql.user.edge_owner_to_timeline_media.edges;
  
        
        while (morePages) {
        const nextUrl = `https://www.instagram.com/graphql/query/?query_hash=${queryHash}&variables={"id":"${userId}","first":999999,"after":"${endCursor}"}`;
        const nextResponse = await fetch(nextUrl);
        const nextJsonData = await nextResponse.json();
        console.log(nextJsonData);
        $.merge(pictures, nextJsonData.data.user.edge_owner_to_timeline_media.edges);
        morePages = nextJsonData.data.user.edge_owner_to_timeline_media.page_info.has_next_page;
        endCursor = nextJsonData.data.user.edge_owner_to_timeline_media.page_info.end_cursor;
        }
        


    
    console.log(pictures);
    extractData([pictures, jsonData.graphql.user]);
  
    if (response.ok) {
      return [pictures, jsonData.graphql.user];
    } else {
      throw new Error(pictures);
    }
}
  

function extractData(data) {
    user = data[1];
    pictures = data[0];

    var biography = user.biography;
    var follow = user.edge_follow.count;
    var followers = user.edge_followed_by.count;
    var numberOfPosts = user.edge_owner_to_timeline_media.count;
    var fullName = user.full_name;
    var userName = user.username;
    var profilePic = user.profile_pic_url;
    var profilePicHD = user.profile_pic_url_hd;
    numberOfVideos = 0;
    numberOfPhotos = 0;
    totalLikes = 0;
    totalComments = 0;
    locations = [];
    taggedPeople = [];


 
    

    $("#usersName").text("@"+userName);
    $("#fullName").text(fullName);
    $("#bio").text(biography);
    $("img").attr("src", profilePic);
    $("#followers").text(followers);
    $("#followedBy").text(follow);
    $("#posts").text(numberOfPosts);
   

    $.each(pictures, function(index, val) {
        console.log(index);
        postAnalyze(val);
      });
    
    $("#numberOfPhotos").text(numberOfPhotos);
    $("#numberOfVideos").text(numberOfVideos);
    $("#totalLikes").text(totalLikes);
    $("#totalComments").text(totalComments);


} 


function postAnalyze (post){

    var accCaption = post.node.accessibility_caption;
    var displayUrl = post.node.display_url;
    var likes = post.node.edge_media_preview_like.count;
    var caption = function () { if (!post.node.edge_media_to_caption.edges.length === 0) { return post.node.edge_media_to_caption.edges.node.text; } };
    var comments = post.node.edge_media_to_comment.count;
    var tagged = post.node.edge_media_to_tagged_user.edges;
    var isVideo = post.node.is_video;
    var location = function () { if (!post.node.location.name === null) { return post.node.location.name;} }
    var thumbnail = post.node.thumbnail_resources[2].src;


    console.log(tagged);

    if (isVideo) {
        numberOfVideos++
    } else {numberOfPhotos++}

    totalLikes += likes;
    totalComments += comments;



}