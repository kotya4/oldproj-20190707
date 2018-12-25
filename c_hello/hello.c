// hello.c
#include <stdio.h>

int func(int a[1]) {
    	printf("%d", a[0]);
    	a[0]++;
	return 0;
}

int main() {
    	printf("Hello, world!\n");
    	int n[1] = { 0 };
	func(n);
	func(n);
    	return 0;
}
