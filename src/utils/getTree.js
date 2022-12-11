// export const GET_LINKS_FROM_ARRAY = array => {
// 	let links = [];
// 	array.forEach(element => {
// 		element.children.forEach(c => {
// 			let child = array.find(el => el.userId === c);
// 			if (child) links.push({ source: element, target: child });
// 		});
// 	});
// 	return links;
// };

// export const GET_CHILD_NODES = (current, array) => {
// 	let result = [current];
// 	if (current.children.length) {
// 		current.children.forEach(el => {
// 			console.log(current.children);
// 			let childs = GET_CHILDREN(el, array);
// 			let uniqChilds = childs.filter(c => !result.some(n => n.userId === c.userId));
//
// 			result = result.concat(uniqChilds);
// 		});
// 	}
// 	return result;
// };

export const GET_CHILDREN = (id, array) => {
	let child = array.find(el => el.userId === id);
	if (!child) return [];
	let result = [child];
	if (child.children.length) {
		child.children.forEach(el => {
			let childs = GET_CHILDREN(el, array);
			let uniqChilds = childs.filter(c => !result.some(n => n.userId === c.userId));

			result = result.concat(uniqChilds);
		});
	}
	return result;
};

export const isChild = (user, users) => {};
