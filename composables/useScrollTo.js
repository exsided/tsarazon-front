export const useScrollTo = (selector) =>
{
	let top = 0;

	if (!process.server)
	{
		const target = document.querySelector(`${selector}`);
		const header = document.querySelector('.header');

		if (!target)
			return top;

		top = target.offsetTop - header.offsetHeight;

		setTimeout(() => window.scrollTo(0, top));
	}

	return top;
};
