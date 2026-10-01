import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CityMapGenerator } from './city-map-generator.service';

describe('CityMapGenerator', () => {
	const mockLat = -20.04685998941891;
	const mockLon = -44.13266102309312;

	let canvasElement: HTMLCanvasElement;
	let mockContext: {
		fillStyle: string;
		fillRect: ReturnType<typeof vi.fn>;
		strokeStyle: string;
		lineWidth: number;
		strokeRect: ReturnType<typeof vi.fn>;
	};

	beforeEach(() => {
		// Cria um elemento canvas real em memória para os testes
		canvasElement = document.createElement('canvas');

		// Simula o contexto 2D do Canvas para monitorar chamadas de desenho
		mockContext = {
			fillStyle: '',
			fillRect: vi.fn(),
			strokeStyle: '',
			lineWidth: 0,
			strokeRect: vi.fn(),
		};

		// Sobrescreve o método getContext para retornar o nosso mock
		vi.spyOn(canvasElement, 'getContext').mockReturnValue(mockContext as unknown as CanvasRenderingContext2D);
	});

	it('should resize the canvas correctly based on the provided size', () => {
		const customSize = 400;
		CityMapGenerator.generate(canvasElement, mockLat, mockLon, customSize);

		expect(canvasElement.width).toBe(customSize);
		expect(canvasElement.height).toBe(customSize);
	});

	it('should accept an ID string to find the canvas element in the DOM', () => {
		canvasElement.id = 'test-canvas';
		document.body.appendChild(canvasElement);

		expect(() => {
			CityMapGenerator.generate('test-canvas', mockLat, mockLon, 200);
		}).not.toThrow();

		document.body.removeChild(canvasElement);
	});

	it('should throw an error if the canvas element is invalid or cannot be found', () => {
		expect(() => {
			CityMapGenerator.generate('canvas-inexistente', mockLat, mockLon);
		}).toThrow('Elemento Canvas inválido ou não encontrado.');
	});

	it('should perform drawing operations in a 2D context (background, blocks, and frame)', () => {
		CityMapGenerator.generate(canvasElement, mockLat, mockLon, 300);

		// Garante que o contexto 2D foi chamado
		expect(canvasElement.getContext).toHaveBeenCalledWith('2d');

		// Verifica se o fundo e a moldura do mapa foram pintados/desenhados
		expect(mockContext.fillRect).toHaveBeenCalled();
		expect(mockContext.strokeRect).toHaveBeenCalled();
	});

	it('should be deterministic: the same coordinates must generate exactly the same drawing calls', () => {
		// Primeira execução com a coordenada
		CityMapGenerator.generate(canvasElement, mockLat, mockLon, 300);
		const callsFirstRun = [...mockContext.fillRect.mock.calls];

		// Limpa o mock e executa novamente com as mesmas coordenadas
		mockContext.fillRect.mockClear();
		CityMapGenerator.generate(canvasElement, mockLat, mockLon, 300);
		const callsSecondRun = [...mockContext.fillRect.mock.calls];

		// Compara se a sequência de retângulos desenhados é idêntica
		expect(callsFirstRun).toEqual(callsSecondRun);
	});
});
