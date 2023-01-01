export const fuzzy = (items, key) => {
  //let searchByCategory = fuzzy(list, 'category');

  return (query) => {
    let words = query.toLowerCase().split(" ");

    return items.filter((item) => {
      let normalizedTerm = item[key].toLowerCase();

      return words.every((word) => {
        return normalizedTerm.indexOf(word) > -1;
      });
    });
  };
};

// Pick a random item from an array
export const randomItem = (arrayOfItems) => {

	let type = typeof arrayOfItems;

	let iLen = arrayOfItems.length;
	let key = 0;
	let keys;

	if (type === 'object') {
		keys = Object.keys(arrayOfItems);
		iLen = keys.length;
	}

	key = Math.floor(Math.random() * iLen);

	let rand_item = arrayOfItems[keys[key]];
	return rand_item;

};

export const filterArray = (array, name) => {
  return array.filter(element => {
    return element.name != name;
  });
}

export const groupByProp = (items, prop) => {

  const groups = {};
  items.map(item => {
    if (groups[item[prop]]) {
      groups[item[prop]].push(item)
    } else {
      groups[item[prop]] = [item]
    }
  });

  return groups;
}

export const createSlug = (title, id) => {
  if (title && id) {
    console.log('1');
    return (
      title
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-') +
      '-' +
      id
    )
  } else if (title) {
    return (
      title
        .toLowerCase()
        .replace(/[^\w ]+/g, '-')
        .replace(/ /g, '-')
    )
  } else {
    console.log('no title or id', title, id)
  }
}

export const getPostDetails = (data) => {
  // console.log("data", data)

  if (data && data.content) {
    let title = data.content.find(element => element.type == "heading");
    if (title && title.content) {
      title = title?.content[0]?.text || "";
    }

    let description = data.content.find(element => element.type == "paragraph");
    if (description && description.content) {
      description = description?.content[0]?.text;
    } else {
      description = "";
    }

    let image = data.content.find(element => element.type == "image");
    image = image?.attrs?.src || ""

    return { title, description, image }
  }
  // return
}

export const getYTLink = (link) => {

  // console.log('getYTLink', link)
  let ytLink = "";
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = link.match(regExp)
  ytLink = match && match[2].length === 11 ? match[2] : null

  if (ytLink) {
    // console.log('getYTLink', ytLink)
    return ytLink
  } else {
    return 'Invalid YouTube link'
  }
}

export const convertDate = (d) => {
  const newDate = new Date(d.seconds * 1000);
  let day = newDate.getDate();
  let m = newDate.getMonth();
  let y = newDate.getFullYear();

  let h = newDate.getHours();
  let min = newDate.getMinutes()

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return day + " " + months[m] + " " + y + " " + h + ":" + min;
};

export const observeElements = (elements) => {
  // Set up an intersection observer to detect when the elements are scrolled into view
  const options = {
    root: document.querySelector("#scrollArea"),
    rootMargin: "0px",
    threshold: 1.0
  };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      // Check if the element is within the window viewport
      if (entry.isIntersecting) {
        // Element is in view, do something with it here
        // console.log(entry)
        entry.target.classList.add("visible")
      } else {
        entry.target.classList.toggle("visible")

      }
    });
  });

  // Start observing the elements
  elements.forEach(element => observer.observe(element));
}