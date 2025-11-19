import { Request, Response, NextFunction } from 'express';
import { auth } from '../config/firebase-admin';

// リクエストにユーザー情報を検証するための型定義
export interface AuthRequest extends Request {
  user?: any;
}

export const verifyAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // リクエストヘッダーからトークンを取得
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({
        error: 'Authorization token required',
      });
      return;
    }
    // カスタムクレームのチェックがあれば追加

    // トークンを検証し、デコードされたユーザー情報を取得
    const decodedToken = await auth.verifyIdToken(token.split(' ')[1]);

    // リクエストオブジェクトにユーザー情報を追加
    req.user = decodedToken;

    next();
  } catch (error) {
    console.error('Auth error:', error);

    res.status(401).json({
      error: 'Authentication error',
    });
    return;
  }
};
