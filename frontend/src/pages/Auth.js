import { useEffect, useRef, useState } from "react";
import "./Auth.css";

function AuthPage() {
	const emailEl = useRef();
	const passwordEl = useRef();
	const [isLogin, setLogin] = useState(true);

	const switchModeHandler = () => {
		setLogin((prevValue) => {
			return !prevValue;
		});
	};

	const submitHandler = (event) => {
		event.preventDefault();
		const email = emailEl.current.value;
		const password = emailEl.current.value;

		if (email.trim().length == 0 || password.trim().length == 0) {
			return;
		}

		let requestBody = {
			query: `
            query{
                login(email:"${email}",password:"${password}"){
                    userId
                    token
                    tokenExpiration
                }
            }
            `,
		};

		if (!isLogin) {
			requestBody = {
				query: `
                    mutation {
                        createUser(userInput:{email: "${email}",password:"${password}"}){
                            _id
                            email
                        }
                    }
                `,
			};
		}

		fetch("http://localhost:8000/graphql", {
			method: "POST",
			body: JSON.stringify(requestBody),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (res.status !== 200 && res.status !== 201) {
					throw new Error("Failed");
				}
				return res.json();
			})
			.then((resData) => {
				console.log(resData);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<form className="auth-form">
			<div className="form-control">
				<label htmlFor="email">Email</label>
				<input type="email" id="email" ref={emailEl}></input>
			</div>

			<div className="form-control">
				<label htmlFor="password">Password</label>
				<input type="password" id="password" ref={passwordEl}></input>
			</div>
			<div className="form-actions">
				<button type="submit" onClick={submitHandler}>
					Submit
				</button>
				<button type="button" onClick={switchModeHandler}>
					Switch to {isLogin ? "Signup" : "Login"}
				</button>
			</div>
		</form>
	);
}

export default AuthPage;
