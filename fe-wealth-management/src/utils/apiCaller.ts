
  
  

  export const fetchData = async(ur) => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
  }

  const url = ""
  fetchData(url);
  