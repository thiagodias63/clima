import { expect, test } from '@playwright/test';

test('should show title', async ({ page }) => {
	await page.goto('/cities');

	await expect(page).toHaveTitle('Clima');
	await expect(page.getByTestId('cities-title')).toHaveText(/Previsões por Cidade/);

	await expect(page.getByTestId('cities-list').locator('[data-testid^="city-index-"]')).toHaveCount(5);
	await expect(page.getByTestId('toggle-map-button')).toBeVisible();
	await expect(page.getByTestId('update-cities-button')).toBeVisible();
	await expect(page.getByTestId('show-as-list-grid-button')).toBeVisible();
});

test('should show maps when click on "toggle-map-button"', async ({ page }) => {
	await page.goto('/cities');
	await expect(page.getByTestId('toggle-map-button')).toHaveText(/Mostrar map/);

	await page.getByTestId('toggle-map-button').click();
	await expect(page.getByTestId('toggle-map-button')).toHaveText(/Esconder map/);

	await expect(page.getByTestId('cities-list').locator('[data-testid^="city-generated-map"]')).toHaveCount(5);
});

test('should hide maps when click on "toggle-map-button"', async ({ page }) => {
	await page.goto('/cities');
	await expect(page.getByTestId('toggle-map-button')).toHaveText(/Mostrar map/);

	await page.getByTestId('toggle-map-button').click();
	await page.getByTestId('toggle-map-button').click();
	await expect(page.getByTestId('toggle-map-button')).toHaveText(/Mostrar map/);

	await expect(page.getByTestId('cities-list').locator('[data-testid^="city-generated-map"]')).toHaveCount(0);
});

test('should update cities when click on "update-cities-button"', async ({ page }) => {
	await page.goto('/cities');
	await expect(page.getByTestId('update-cities-button')).toHaveText(/Atualizar/);
	await expect(page.getByTestId('cities-list').locator('[data-testid^="city-index-"]')).toHaveCount(5);
	const firstCities = await page.getByTestId('cities-list').locator('[data-testid^="city-index-"]').allTextContents();

	await page.getByTestId('update-cities-button').click();

	const cities = page.getByTestId('cities-list').locator('[data-testid^="city-index-"]');
	await expect.poll(async () => cities.allTextContents()).not.toEqual(firstCities);
	await expect(cities).toHaveCount(5);
});

test('should show cities as list when click on "show-as-list-grid-button" and is a "grid"', async ({ page }) => {
	await page.goto('/cities');
	expect(page.getByTestId('show-as-list-grid-button')).toBeDefined();

	await page.getByTestId('show-as-list-grid-button').click();

	await expect(page.getByTestId('cities-list').locator('[data-testid="city-index-0"]')).toHaveClass('col-span-full');
});

test('should show cities as grid when click on "show-as-list-grid-button" and is a "list"', async ({ page }) => {
	await page.goto('/cities');
	expect(page.getByTestId('show-as-list-grid-button')).toBeDefined();

	await page.getByTestId('show-as-list-grid-button').click();
	await page.getByTestId('show-as-list-grid-button').click();

	await expect(page.getByTestId('cities-list').locator('[data-testid="city-index-0"]')).not.toHaveClass('col-span-full');
});

test('should show the current city when click on "data-testid="detect-location-button""', async ({ page }) => {
	await page.goto('/cities');
	await expect(page.getByTestId('detect-location-button')).toHaveText(/ Detectar Minha Localização 📍/);

	await page.context().grantPermissions(['geolocation'], { origin: 'http://localhost:4200' });
	await page.context().setGeolocation({ latitude: -23.5505, longitude: -46.6333 });

	await page.getByTestId('detect-location-button').click();

	await expect(page.getByTestId('local-city')).toBeVisible();
	await expect(page.getByTestId('local-city').getByTestId('city')).toHaveText(/Sua localização/);
	await expect(page.getByTestId('local-city').getByTestId('temperature')).toHaveText(/21ºc/);
});
