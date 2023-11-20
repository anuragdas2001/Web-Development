// // Replace 'addFriendButton' with the ID or class of your button
// const addFriendButton = document.getElementById('addFriendButton');

// addFriendButton.addEventListener('click', () => {
//   const friendId = 'ReplaceWithFriendId'; // Replace with the actual friend's ID

//   fetch(`/addFriend/${friendId}`, {
//     method: 'POST', // Assuming you use POST for adding a friend
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.message === 'Friend added successfully') {
//         // Friend added successfully, update your UI as needed
//         console.log('Friend added successfully:', data);
//       } else {
//         // Handle error or friendship already exists
//         console.log('Error:', data.message);
//       }
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
// });
// // Replace 'removeFriendButton' with the ID or class of your button
// const removeFriendButton = document.getElementById('removeFriendButton');

// removeFriendButton.addEventListener('click', () => {
//   const friendId = 'ReplaceWithFriendId'; // Replace with the actual friend's ID

//   fetch(`/removeFriend/${friendId}`, {
//     method: 'POST', // Assuming you use POST for removing a friend
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.message === 'Friend removed successfully') {
//         // Friend removed successfully, update your UI as needed
//         console.log('Friend removed successfully:', data);
//       } else {
//         // Handle error or friendship not found
//         console.log('Error:', data.message);
//       }
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
// });
