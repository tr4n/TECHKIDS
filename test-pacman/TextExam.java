package begin;
import java.util.*;
import java.io.*;



public class testExample {
	public static Scanner in = new Scanner(System.in);
	public static int [][] 	A = new int[100][100];
	public static int 		N; 
	public static int 		xB=1, yB=1, xS=1, yS=1,xP=1,yP=1; 
	public static int []	X = {0,-1,0,1}; 
	public static int []	Y = {1,0,-1,0}; 
	
	
	
	public static void Print()
	{
		
		for(int i =1 ;i <= N ;i ++)
		{
			for(int j =1 ;j <= N ;j ++)
			{
				if(i == xP && j == yP)
					System.out.print("P ");
				else if(i == xB && j == yB)
					System.out.print("B ");
				else if(i == xS && j == yS)
					System.out.print("S ");
				else
					System.out.print("- ");
			
			}
			
			System.out.println();
					
		}		
	}
	
	public static int checkFail()
	{
		
		if( (xB == xS) && (yB == yS) )
			return 1; 
		
		if( (xB == 1 && yB == 1) || (xB == 1 && yB == N)
		 || (xB == N && yB == 1) || (xB == N && yB == N))
			return -1; 
		
		return 0; 	
		
	}
	
	public static int movePlayer(char move)
	{
		int k=1 ;
		if	  (move == 'A')
			k = 2; 
		else 
			if(move == 'W')
				k = 1; 
		else
			if(move == 'S')
				k = 3; 
		else
			if(move == 'D')
				k = 0; 
		
		
		boolean nextBox = false; 
		
		if(((xP + X[k] )== xB) && ((yP + Y[k]) == yB))
			nextBox = true; 
		
		
		if(!nextBox)
		{
			if(!(xP + X[k] >= 1 && xP + X[k] <= N 
					&& yP + Y[k] >= 1 && yP + Y[k] <= N ))
					return -1; 
			
		}
		else
		{
			if(!(xB + X[k] >= 1 && xB + X[k] <= N 
					&& yB + Y[k] >= 1 && yB + Y[k] <= N ))
					return -1; 
			
		}
		
		xP += X[k];
		yP += Y[k];
		
		if(nextBox)
		{
			xB += X[k];
			yB += Y[k];
			
		}
		
		
		return 1;
		
		
	}

	
	public static void main(String[] args) {
		
		
		N = in.nextInt();
		int a; 
		//N = 4; 
		
		for(int i =1 ;i<= N ;i ++)
		{
			for(int j = 1 ;j <= N ;j ++)
			{
				a = in.nextInt();
				if(a == 1)
				{
					xP = i; 
					yP = j;
				}
				else
				if(a == 2)
				{
					xB = i; 
					yB = j;
				}
				else
				if(a == 3)
				{
					xS = i; 
					yS = j;
				}				
			}
		}
		Print();
		String path; 
		
		path = in.next();
			
		// 0 = empty , 1 = player , 2 = box , 3 = Storage;
		// A - Left  , W = up 	, S - down 	, D - Right; 
		
		
		
		while(path!= "000")
		{
			for(int i = 0 ;i < path.length();i ++)
			{
				char move = path.charAt(i);				
				int v = movePlayer(move);				
				if(v == -1) {
					if(i == path.length() -1 ) 
						System.out.print("Can't move ! Move again ! \n");
					if(i == path.length() - 1)
						Print();
				}					
				else
				{
					if(i == path.length() -1 ) 
						Print();
					if(checkFail() == 1)
					{
						System.out.print("YOU WIN !");						
						return ; 
					}
					else 
					if(checkFail() == -1)
					{
						System.out.print("YOU LOST !");
						return; 
					}				
				}				
			}			
			path = in.next();
		}
   }

}
