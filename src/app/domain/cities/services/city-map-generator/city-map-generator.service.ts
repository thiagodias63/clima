export class CityMapGenerator {
	/**
	 * Converte coordenadas geográficas em um número inteiro único para servir de semente (seed).
	 * @param lat - Latitude
	 * @param lon - Longitude
	 * @returns Semente inteira
	 */
	private static _coordinatesToSeed(lat: number, lon: number): number {
		const fixedLat = Math.round(lat * 1000000);
		const fixedLon = Math.round(lon * 1000000);
		return Math.abs((fixedLat ^ fixedLon) + fixedLat * 397);
	}

	/**
	 * Implementação do PRNG Mulberry32 para geração determinística.
	 * @param seed - Semente numérica inicial
	 * @returns Função geradora de números pseudo-aleatórios entre 0 e 1
	 */
	private static _mulberry32(seed: number): () => number {
		let t = (seed += 0x6d2b79f5);
		return function (): number {
			t = Math.imul(t ^ (t >>> 15), t | 1);
			t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
		};
	}

	/**
	 * Gera uma paleta de cores temática de mapa (estilo Google Maps / City View).
	 * @param random - Função geradora de números aleatórios
	 * @returns Objeto contendo as cores da paleta
	 */
	private static _generateMapPalette(random: () => number): {
		background: string;
		water: string;
		park: string;
		buildings: string[];
	} {
		const baseHue = Math.floor(random() * 60) + 90; // Tons entre verde e amarelo-esverdeado

		return {
			background: '#f4f6f8', // Fundo estilo papel/mapa limpo
			water: '#a0c4ff', // Azul claro para rios/lagos
			park: `hsl(${baseHue}, 35%, 75%)`, // Verde suave para áreas verdes
			buildings: [
				'#e74c3c', // Edifícios em tom terracota/vermelho
				'#34495e', // Edifícios escuros/modernos
				'#f39c12', // Edifícios alaranjados
				'#bdc3c7', // Edifícios cinzas/concretos
				'#2980b9', // Edifícios corporativos azuis
			],
		};
	}

	/**
	 * Gera o avatar com alta densidade de pixels e paleta temática de mapa.
	 * @param canvasIdOrElement - ID do elemento canvas ou a própria instância HTMLCanvasElement
	 * @param latitude - Latitude da cidade
	 * @param longitude - Longitude da cidade
	 * @param size - Tamanho do canvas em pixels (largura e altura)
	 */
	public static generate(canvasIdOrElement: string | HTMLCanvasElement, latitude: number, longitude: number, size: number = 300): void {
		const canvas =
			typeof canvasIdOrElement === 'string' ? (document.getElementById(canvasIdOrElement) as HTMLCanvasElement) : canvasIdOrElement;

		if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
			throw new Error('Elemento Canvas inválido ou não encontrado.');
		}

		const ctx = canvas.getContext('2d');
		if (!ctx) {
			throw new Error('Não foi possível obter o contexto 2D do canvas.');
		}

		canvas.width = size;
		canvas.height = size;

		const seed = this._coordinatesToSeed(latitude, longitude);
		const random = this._mulberry32(seed);
		const palette = this._generateMapPalette(random);

		// Preenche o fundo geral do mapa
		ctx.fillStyle = palette.background;
		ctx.fillRect(0, 0, size, size);

		const gridSize = 24;
		const grid: (string | number)[][] = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));

		for (let r = 0; r < gridSize; r++) {
			for (let c = 0; c < gridSize; c++) {
				const val = random();
				if (val < 0.3) {
					grid[r][c] = 'park';
				} else if (val < 0.45) {
					grid[r][c] = 'water';
				} else if (val < 0.9) {
					const bIndex = Math.floor(random() * palette.buildings.length);
					grid[r][c] = palette.buildings[bIndex];
				} else {
					grid[r][c] = 'empty';
				}
			}
		}

		const padding = size * 0.05;
		const mapSize = size - padding * 2;
		const cellMapSize = mapSize / gridSize;

		ctx.fillStyle = '#ffffff';
		ctx.fillRect(padding, padding, mapSize, mapSize);

		for (let r = 0; r < gridSize; r++) {
			for (let c = 0; c < gridSize; c++) {
				const type = grid[r][c];
				if (type === 'empty') continue;

				if (type === 'park') ctx.fillStyle = palette.park;
				else if (type === 'water') ctx.fillStyle = palette.water;
				else ctx.fillStyle = type as string;

				const posX = padding + c * cellMapSize;
				const posY = padding + r * cellMapSize;

				ctx.fillRect(posX, posY, cellMapSize + 0.5, cellMapSize + 0.5);
			}
		}

		ctx.strokeStyle = '#dcdde1';
		ctx.lineWidth = 2;
		ctx.strokeRect(padding, padding, mapSize, mapSize);
	}
}
