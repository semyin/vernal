export { Page };

function Page() {
  const arr = new Array(1).fill('ok')
	return (
		<>
      { arr.map((item, index) => {
        return <p key={index}>item</p>
      }) }
		</>
	);
}
