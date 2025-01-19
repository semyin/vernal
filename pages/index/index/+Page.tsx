export { Page };

function Page() {
  const arr = new Array(100).fill('ok')
	return (
		<>
      { arr.map((item, index) => {
        return <p key={index}>item</p>
      }) }
		</>
	);
}
