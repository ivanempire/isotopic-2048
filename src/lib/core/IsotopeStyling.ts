export type IsotopeStyling = {
	name: string;
	label: string;
	stylingClass: string;
};

export const getLabelFromMass = (mass: number): IsotopeStyling => {
	switch (mass) {
		case 2:
			return { name: "Hydrogen-2", label: "H", stylingClass: "hydrogen-2" };
		case 4:
			return { name: "Helium-4", label: "He", stylingClass: "helium-4" };
		case 8:
			return { name: "Beryllium-8", label: "Be", stylingClass: "beryllium-8" };
		case 16:
			return { name: "Oxygen-16", label: "O", stylingClass: "oxygen-16" };
		case 32:
			return { name: "Phosphorus-32", label: "P", stylingClass: "phosphorus-32" };
		case 64:
			return { name: "Nickel-64", label: "Ni", stylingClass: "nickel-64" };
		case 128:
			return { name: "Tin-128", label: "Sn", stylingClass: "tin-128" };
		case 256:
			return { name: "Nobelium-256", label: "No", stylingClass: "nobelium-256" };
		case 512:
			return { name: "Germanium-512", label: "", stylingClass: "germanium-512" };
		case 1024:
			return { name: "Unobtanium-1024", label: "Un", stylingClass: "unobtanium-1024" };
		case 2048:
			return { name: "Unobtanium-2048", label: "Un", stylingClass: "unobtanium-2048" };
		default:
			return { name: "Germanium-32", label: "", stylingClass: "hydrogen-2" };
	}
};
