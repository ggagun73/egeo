// Test List

// Test 예제1
test("Hello Test", function() {
	// ok : True인지, False인지 판단 (값만 비교)
	ok(1 == "1", "True");
	ok(1 == 1, "True");
	ok(1 == "2", "True");
	ok(1 == 2, "True");
});

//Test 예제2
test("Equal Test", function() {
	// 값이 같은지 비교
	equal(1,1,"성공");
	equal(1,"1","성공");
	// 값과 타입이 같은지 비교
	deepEqual(1,1,"같다");
	deepEqual(1,"1","같다");
});

//Test 예제3
test("StrictEqual test", function() {
	// 값과 타입이 같은지 비교
	strictEqual(1,"1","타입, 값 모두 같다.");
	strictEqual("1","1","타입, 값 모두 같다.");
});

//Test 예제4
test("Expect Test", function() {
	// 몇개의 Test가 실행될것인지 판단
	expect(4);
	equal(1,1,"성공");
	equal(1,"1","성공");
	deepEqual(1,1,"같다");
	deepEqual(1,"1","같다");
});

// Test 예제5
// Module : 테스트 그룹을 나눈다.
module( "group a" );
test( "a basic test example", function() {
  ok( true, "this test is fine" );
});
test( "a basic test example 2", function() {
  ok( true, "this test is fine" );
});

module( "group b" );
test( "a basic test example 3", function() {
  ok( true, "this test is fine" );
});
 
test( "a basic test example 4", function() {
  ok( true, "this test is fine" );
});
