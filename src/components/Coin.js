import "./Coin.css"
import { useEffect, useState } from "react"
import { Button } from "web3uikit"
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis"

const Coin = ({ perc, setPerc, token, setModalToken, setVisible }) => {
	const [color, setColor] = useState(50)
	const contractProcessor = useWeb3ExecuteFunction()
	const { isAuthenticated } = useMoralis()

	useEffect(() => {
		if (perc < 50) {
			setColor("#c43d08")
		} else {
			setColor("green")
		}
	}, [perc])

	async function vote(upDown) {
		let options = {
			contractAddress: "0xE97F6A9337895eb562f0175B2b8e3dDA44F9fA46",
			functionName: "vote",
			abi: [
				{
					inputs: [
						{
							internalType: "string",
							name: "_ticker",
							type: "string",
						},
						{
							internalType: "bool",
							name: "_vote",
							type: "bool",
						},
					],
					name: "vote",
					outputs: [],
					stateMutability: "nonpayable",
					type: "function",
				},
			],
			params: {
				_ticker: token,
				_vote: upDown,
			},
		}

		await contractProcessor.fetch({
			params: options,
			onSuccess: () => {
				console.log("vote succesful")
			},
			onError: (error) => {
				alert(error.data.message)
			},
		})
	}

	return (
		<>
			<div>
				<div className="token">{token}</div>
				<div className="circle" style={{ boxShadow: `0 0 20px ${color}` }}>
					<div
						className="wave"
						style={{
							marginTop: `${100 - perc}%`,
							boxShadow: `0 0 20px ${color}`,
							backgroundColor: color,
						}}
					></div>
					<div className="percentage">{perc}%</div>
				</div>
				<div className="votes">
					<Button
						onClick={() => {
							setPerc((perc) => {
								if (isAuthenticated) {
									vote(true)
								} else {
									alert("Authenicate to Vote")
								}
							})
						}}
						text="Up"
						theme="primary"
						type="button"
					/>
					<Button
						color="red"
						onClick={() => {
							setPerc(() => {
								if (isAuthenticated) {
									vote(false)
								} else {
									alert("Authenicate to Vote")
								}
							})
						}}
						text="Up"
						theme="colored"
						type="button"
					/>
				</div>
				<div className="votes">
					<Button
						onClick={() => {
							setVisible(true)
							setModalToken(token)
						}}
						text="INFO"
						theme="translucent"
						type="button"
					/>
				</div>
			</div>
		</>
	)
}

export default Coin
