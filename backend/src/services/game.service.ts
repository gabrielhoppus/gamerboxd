import errors from "@/errors/index";
import { request } from '@/utils/request';
import { gameRepository } from "@/repositories/game.repository";
import { GameEntity, ApiEntity } from "@/protocols/game.protocols";

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

  const { name, released } = result.data as ApiEntity;

  const game: GameEntity = {
    id: id,
    title: name,
    released: released,
  };
  return game;
}

async function addGame(id: number) {
  try {
    const { title, released } = await getGameById(id) as GameEntity;

    await gameRepository.addGame(id, title, released)

  } catch {
    throw errors.invalidDataError(['Id inválido']);
  }
}

async function getGameByName(title: string) {
  const results = await request.get(`${process.env.GAME_URL}/games?key=${process.env.GAME_KEY}&search=${title}`);

  if (!results.data) {
    throw errors.notFoundError();
  }
  return results;
}

async function getLatestGames() {
  const firstDate = new Date(new Date().getFullYear(), 0, 1);
  const currentDate = new Date();
  const result = await request.get(`${process.env.GAME_URL}/games?key=${process.env.GAME_KEY}&dates=${firstDate},${currentDate}&ordering=-added&page=1&page_size=4`)

  if (!result.data) {
    throw errors.notFoundError();
  }

  return result;
}

export default {
  getGameByName,
  getGameById,
  getAllGames,
  getLatestGames,
  addGame,
}