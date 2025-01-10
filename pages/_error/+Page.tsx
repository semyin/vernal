export { Page };

function Page() {

	return (
		<Center>
			<p style={{ fontSize: "1.3em" }}>{'Page not found.'}</p>
		</Center>
	);
}

function Center({ children }: { children: React.ReactNode }) {
	return (
		<div
			style={{
				height: "calc(100vh - 100px)",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{children}
		</div>
	);
}
