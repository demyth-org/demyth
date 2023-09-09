export class CreateHeroDto {
    name: string;
	sex: string;
	player: {
		login: string;
		address: string;
	};
	
}