package Test;
import java.util.*;
import java.io.*;

public class Pacman2 {

	public static Scanner in = new Scanner(System.in);
	public static Random rand = new Random();
	

	public static int[][] A = new int[30][30];
	public static int 		level = 0,Basic = 1;
	public static int 		xPacman=1, yPacman=1, numberGhost = 0;
	public static int 		Score = 0, Around = 0, Move = 0, Point = 0 ; 
	public static int []	xGhost = new int[20];
	public static int []	yGhost = new int[20];
	public static int []	Next  = new int[20];
	public static int N = 4; 
	//  
	public static int []	X = {0,-1,0,1}; 
	public static int []	Y = {1,0,-1,0}; 
	
	/* The game is one of version of Pacman Game 
	 * Game is written in Java
	 * In game, P is mean Pacman, G is mean Ghost
	 *  
	 */
	
	public static void CreatMap(int N)
	{
		Score = N;
		
		int P = rand.nextInt(N*N);
		int [] G = new int[20];
		for(int i =1 ;i <= N ;i ++)
			G[i] = P;	
		
		if(Basic == 1)
		{
			if( N <=8)
			{
				int i = 1;	
				numberGhost = 1; 
				while(G[i] == P)
				{
					G[i] = rand.nextInt(N*N);
				}
				
			}
			else if(N<=11)
			{
				numberGhost = 2; 
				for(int i =1 ;i <=numberGhost ;i ++)
					while(G[i] == P)
					{
						G[i] = rand.nextInt(N*N);
					}
			}
			else
			{
				numberGhost = 3; 
				for(int i = 1 ;i <= numberGhost ;i ++)
					while(G[i] == P)
					{						
						G[i] = rand.nextInt(N*N);
					}
			}
		}
		else// MODERN GAME 
		{
			numberGhost = (2*N)/3;
			for(int i = 1 ;i <= numberGhost;i ++)
			{
				while(G[i] == P)
				{
					G[i] = rand.nextInt(N*N);
				}
			}			
		}				
		int caro = 0;
		for(int i =1 ;i <= N ;i ++)
		{
			for(int j =1 ;j <= N ;j ++)
			{
				if(caro == P)
				{
					xPacman = i; 
					yPacman = j;					
				}
				else
				{					
					for(int k = 1 ;k <= numberGhost ;k ++)
					{
						if(caro == G[k])
						{
							xGhost[k] = i; 
							yGhost[k] = j;
														
						}						
					}					
				}				
				caro ++;				
			}		
		}	
	}
	
	public static int isAround()
	{		
		for(int i =0 ;i <= numberGhost ; i ++)
			Next[i] = -1;
		
		int k = -1; 
		int cnt = 0;
		
		for(int i = 0 ;i < 4 ;i ++)
		{
			for(int g = 1; g <= numberGhost ; g++) 
			{					
				if(xPacman + X[i] == xGhost[g] && yPacman + Y[i] == yGhost[g])
				{
					Next[g] = i;
					cnt ++;					
				}
			}			
		}	
						
		if(cnt > 0)
			return cnt;
		else
			return -1 ;	
	}
	
	public static void Print(int ghost)
	{
		Around = isAround() ; 
		if(Around == -1) Around = 0;
		
		System.out.println("-----------------GAME------------------------");
		System.out.println();
		System.out.println("Score                      : " + Score);
		System.out.println("Number of enemy            : " +numberGhost );
		System.out.println("Number of enemy around     : " +Around);
		for(int i =1 ;i <= N ;i ++) {
			for(int j =1 ;j <= N ;j ++)
			{
				if(i == xPacman && j == yPacman )
				{
					System.out.print("P ");										
				}
				else
				{
					boolean g = false;
					
					for(int k =1 ;k <= numberGhost;k++)
					{
						if(i == xGhost[k] && j == yGhost[k])
						{
							if(ghost == 1)
								System.out.print("G ");
							else
								System.out.print("- ");
							g = true;
							break;
						}
					}
					
					if(!g)
					{
						System.out.print("- ");
					}					
				}				
			}
			System.out.println();
		}			
		System.out.println("\n-----NOTIFICATIONS------");
	}
	
	public static int moveGhost()
	{
		boolean ok = false;
			for(int i = 1; i<= numberGhost ;i ++)
			{
				int k = 0;
				ok = false; 				
				while(!ok)
				{
					k = rand.nextInt(100)%4;
					
					if((xGhost[i] + X[k] >= 1 && xGhost[i] + X[k] <= N
							&& yGhost[i] + Y[k] >= 1 && yGhost[i] + Y[k] <= N ))
					{
						if(xGhost[i] + X[k] == xPacman && yGhost[i] + Y[k] == yPacman)
							break;
						else
							ok = true;
						
					}					
				}
				
				if(ok)
				{
					xGhost[i] += X[k];
					yGhost[i] += Y[k];
				}
				
			}			
		
		
		if(ok) return 1;
				
		return -1;		
	}
	
	
	
	// Move player 
	public static int movePlayer(char move)
	{
		int k=1 ;
		if	  (move == 'A'|| move == 'a')
			k = 2; 
		else 
			if(move == 'W' || move == 'w')
				k = 1; 
		else
			if(move == 'S' || move == 's')
				k = 3; 
		else
			if(move == 'D'|| move == 'd')
				k = 0; 
			else
				return -1;
		
		
		if(!(xPacman + X[k] >= 1 && xPacman + X[k] <= N
				&& yPacman + Y[k] >= 1 && yPacman + Y[k] <= N ))
				return -1; 
		
		return k ; 
		
	}
	
	public static int Shot(char shot)
	{
		
			
		int k=1 ;
		if	  (shot == 'J'|| shot == 'j')
			k = 2; 
		else 
			if(shot == 'K' || shot == 'k')
				k = 1; 
		else
			if(shot == 'M' || shot == 'm')
				k = 3; 
		else
			if(shot == 'L'|| shot == 'l')
				k = 0; 
		else
			return -1;
		
		int h = -1;
		for(int i = 1;i <= numberGhost ; i ++)
		{
			if(k == Next[i])
			{
				h = i;
				break;
			}
		}
		
		if(h != -1)
		{

			for(int i = h ;i < numberGhost ;i ++)
			{
				xGhost[i] = xGhost[i+1];
				yGhost[i] = yGhost[i+1];
			}
			numberGhost --;		
			return k;
		}	
		return -1;
		
	}
	
	
	public static void WARNING(int near)
	{
		if(near != -1)
		{
			System.out.println("-->WARNING<--: Be careful !!" );	
			
			System.out.println("You have " + 2*near + " shot-turns (2 turns/ghost)");
		}		
	}
	
	// MAIN ****************************************
	public static void main(String[] args)
	{
		
		boolean dieGhost = false;
		
		
		System.out.println("********************************************************");
		System.out.println("* Morden Pacman Game  TECHKIDS                         *");
		System.out.println("* Use                                                  *");
		System.out.println("* A W D S to move        |A-Left|W-Up|D-Right|S-Down|  *");
		System.out.println("* J K L  M to shot enemy |J-Left|K-Up|L-Right|M-Down|  *");
		System.out.println("*                                                      *");
		System.out.println("********************************************************");	
		System.out.print("Choose Size of map NxN     (5->15) | ");			N 		= in.nextInt();	
		while(N < 5 || N > 15)
		{
			System.out.println(" Enter again !");
			N = in.nextInt();
		}
		
		System.out.print("Choose       Test (1) or Hard  (2) | ");			level 	= in.nextInt();
		System.out.print("Choose Basic-Test (1) or Morden(2) | ");			Basic 	= in.nextInt();
		
		CreatMap(N);
		System.out.println();
		
		Print(level);		
		
		do
		{		
			int near = isAround();
			if(near != -1)
			{				
				WARNING(near);				
			}
			
			String Shot1 = "", Shot2 = "";
			
			for(int i =1 ;i <= near ;i ++)
			{
				if(i > 1)
				{
					System.out.print("Continue to shot : ");
				}
				Shot1 = in.next();
				if(-1 != Shot(Shot1.charAt(0)) ) 
				{
					Score += 5;
					System.out.println("The ghost was died (+5)");	
					Print(level);
					continue;
					
				}
				else
				{
					Score -= 10;
					System.out.println("Oh, shot again (-10)");
					Shot2 = in.next();
					if(-1 != Shot(Shot2.charAt(0)))
					{
						Score +=5;
						System.out.println("The ghost was died (+5) ");
						Print(level);
						
						
					}
					else
					{
						Score = 0;
						Print(1);
						System.out.println("You LOST ");
						
						return; 
					}
				}			
			}
		
			
			if(numberGhost <= 0)
			{
				System.out.println("YOU WIN");
				return;
			}			
			else
			{
				System.out.println("Your move? ");				
				String S = in.next();
				int k = movePlayer(S.charAt(0));				
				while(-1 == k )
				{
					System.out.println("Can't move ! move again! ");
					String _movePlayer = in.next();
					k = movePlayer(_movePlayer.charAt(0));
				}
				Score ++;
				xPacman += X[k];
				yPacman += Y[k];				
				int v = moveGhost();				
				Print(level);							
			}
			
			
		}while(numberGhost >0);
		
	
	}
	
	
}
