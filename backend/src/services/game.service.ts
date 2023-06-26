import errors from "@/errors/index";
import { request } from '@/utils/request';
import { gameRepository } from "@/repositories/game.repository";
import { GameEntity } from "@/protocols/game.protocols";

async function getAllGames() {
  const games = await gameRepository.findAllGames();
  if (!games) throw errors.notFoundError();
  return games;
}

async function getGameById(id: number) {
  const result = await request.get(`${process.env.GAME_URL}/games/${id}?key=${process.env.GAME_KEY}`);
  if (!result.data) {
    throw errors.notFoundError();
  }

  const game = result.data;

  return game;
}

async function addGame(id: number) {
  try {
    const game = await getGameById(id) as GameEntity;

    await gameRepository.addGame(id, game.title, game.released)

  } catch {
    throw errors.invalidDataError(['Id inválido']);
  }
}

async function getGameByName(title: string) {
  const results = await request.get(`${process.env.GAME_URL}/games?key=${process.env.GAME_KEY}&search=${title}&page=1&page_size=4`);

  if (!results.data.results) {
    throw errors.notFoundError();
  }

  return results.data.results;
}

async function getLatestGames() {
  const firstDate = new Date(new Date().getFullYear(), 0, 1);

  const currentDate = new Date();

  const result = await request.get(`${process.env.GAME_URL}/games?key=${process.env.GAME_KEY}&dates=${firstDate.toISOString().slice(0, 10)},${currentDate.toISOString().slice(0, 10)}&ordering=-added&page=1&page_size=4`)

  if (!result.data) {
    throw errors.notFoundError();
  }

  return result.data;
}

export default {
  getGameByName,
  getGameById,
  getAllGames,
  getLatestGames,
  addGame,
}