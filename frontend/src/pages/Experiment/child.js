import { useEffect } from "react";

function Child() {
	useEffect(() => {
		console.log("Rendering Children");
		return () => {
			console.log("Reterning from Children");
		};
	}, []);
	return <div>Child</div>;
}

export default Child;
