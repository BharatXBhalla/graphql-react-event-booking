import { useCallback, useEffect, useMemo } from "react";
import Child from "./Experiment/child";

function Experiment() {
	let arr = useMemo(() => [1, 2, 3, 4, 5]);

	const handleSubmit = useCallback(() => {});
	useEffect(() => {
		console.log("Rendering Parent ");
		return () => {
			console.log("Returing from Parent");
		};
	}, []);
	return (
		<div>
			<h1>Parent</h1>
			{arr.map((ele) => (
				<Child key={ele} handleSubmit></Child>
			))}
		</div>
	);
}

export default Experiment;
