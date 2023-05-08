// const dates = [
//     new Date('24 April 2023 at 07:41:04 UTC+05:30'),
//     new Date('24 April 2023 at 07:41:04 UTC+05:30'),
//   ];

//  const data =[ new Date (...dates)]

//  const newdATE = data.sort((a, b) => {
//     // let oldDate = new Date("24 April 2023 at 07:41:04 UTC+05:30")
//     // let newDate = new Date()
//     const result  =b.getDate - a.getDate;
//     console.log(result)    
// });

// const formatDate = (timestamp) => {
//     const date = new Date(timestamp);
//     const today = new Date();
//     const yesterday = new Date();
//     yesterday.setDate(today.getDate() - 1);
  
//     if (date.toDateString() === today.toDateString()) {
//         console.log(today);
//       // If the message was sent today, show the time
//       return moment(date).format('h:mm A');
//     } else if (date.toDateString() === yesterday.toDateString()) {
//       // If the message was sent yesterday, show "Yesterday"
//       console.log(yesterday);
//       return 'Yesterday';
//     } else {
//       // Otherwise, show the date
//       return moment(date).format('MMM D');
//     }
//   };
// Create a Date object from the string
const dateString = '24 April 2023 at 07:41:04 UTC+05:30';
const date = new Date(dateString);


