import { handleStaticResourceRequest } from "../staticResourcesServer.js";

export default class MathsController  {

    static async operation(HttpContext) {

        switch (HttpContext.req.method) {
            case 'GET':
                const PATH = HttpContext.path;
                
                if ("op" in PATH.params)
                {
                    const PARAMS = PATH.params;
                    const OPERATOR = PARAMS.op;

                    switch (OPERATOR) {
                        case " ":
                            MathsController.addition(HttpContext, PARAMS.x, PARAMS.y, "+", PARAMS);
                            break;
                        case "-":
                            MathsController.substraction(HttpContext, PARAMS.x, PARAMS.y, "-", PARAMS);
                            break;
                        case "*":
                            MathsController.multiplication(HttpContext, PARAMS.x, PARAMS.y, "*", PARAMS);
                            break;
                        case "/":
                            MathsController.division(HttpContext, PARAMS.x, PARAMS.y, "/", PARAMS);
                            break;
                        case "%":
                            MathsController.mod(HttpContext, PARAMS.x, PARAMS.y, "%", PARAMS);
                            break;
                        case "!":
                            MathsController.factorial(HttpContext, PARAMS.n, "!", PARAMS);
                            break;
                        case "p":
                            MathsController.isPrimeNumberServer(HttpContext, PARAMS.n, "p", PARAMS);
                            break;
                        case "np":
                            MathsController.getNthPrime(HttpContext, PARAMS.n, "np", PARAMS);
                            break;
                        default:
                            HttpContext.response.notFound();
                    }
                }
                else if (PATH.queryString === "?") {
                    HttpContext.req.url = "../wwwroot/Maths/index.html";
                    handleStaticResourceRequest(HttpContext);
                }
                else {
                    HttpContext.response.badRequest();
                }

            break;

            default:
                HttpContext.response.notImplemented();
        }
    }

    static addition(HttpContext, x, y, op, params) {
        if (x === undefined) {
            HttpContext.response.JSON({ "op" : op, "x" : x, "y" : y, "error" : "'x' parameter is missing"});
        }
        else if (y === undefined) {
            HttpContext.response.JSON({ "op" : op, "x" : x, "y" : y, "error" : "'y' parameter is missing"});
        }
        else if (isNaN(x))
        {
            HttpContext.response.JSON({ "op" : op, "x" : x, "y" : y, "error" : "'x' parameter is not a number"});
        }
        else if (isNaN(y)) {
            HttpContext.response.JSON({ "op" : op, "x" : x, "y" : y, "error" : "'y' parameter is not a number"});
        }
        else {
            const VALUE = new Number(x) + new Number(y);

            if (Object.keys(params).length > 3)
            {
                HttpContext.response.JSON({ "op" : op, "x" : x, "y" : y, "value" : VALUE,
                    "error" : "There is too many parameters"});
            }
            else
            {
                HttpContext.response.JSON({ "op" : op, "x" : x, "y" : y, "value" : VALUE });
            }
        }
    }

    static substraction(HttpContext, x, y, op, params) {

        if (x === undefined) {
            HttpContext.response.JSON({ "op" : op, "x" : x, "y" : y, "error" : "'x' parameter is missing"});
        }
        else if (y === undefined) {
            HttpContext.response.JSON({ "op" : op, "x" : x, "y" : y, "error" : "'Y' parameter is missing"});
        }
        else if (isNaN(x))
        {
            HttpContext.response.JSON({ "op" : op, "x" : x, "y" : y, "error" : "'x' parameter is not a number"});
        }
        else if (isNaN(y)) {
            HttpContext.response.JSON({ "op" : op, "x" : x, "y" : y, "error" : "'y' parameter is not a number"});
        }
        else {
            const VALUE = new Number(x) - new Number(y);

            if (Object.keys(params).length > 3)
            {
                HttpContext.response.JSON({ "op" : op, "x" : x, "y" : y, "value" : VALUE,
                    "error" : "There is too many parameters"});
            }
            else
                HttpContext.response.JSON({ "op" : op, "x" : x, "y" : y, "value" : VALUE });
        }
    }

    static getFixedValue(number, fixedIndex = null) {

        if (fixedIndex == null) {
            fixedIndex = number.toString().indexOf(".");
        }

        return number.substring(fixedIndex, number.length);
    }

    static getFixedLength(number) {
        const STRING_NUMBER = number.toString();
        const FIXEDINDEX = STRING_NUMBER.indexOf(".") + 1;

        return FIXEDINDEX == 0 ? 0 : MathsController.getFixedValue(STRING_NUMBER, FIXEDINDEX).length;
    }

    static isInteger(number) {
        return number.toString().indexOf(".") == -1;
    }

    static multiplication(HttpContext, x, y, op, params) {

        if (x === undefined) {
            HttpContext.response.JSON({ "op" : op, "x" : x, "y" : y, "error" : "'x' parameter is missing"});
        }
        else if (y === undefined) {
            HttpContext.response.JSON({ "op" : op, "x" : x, "y" : y, "error" : "'Y' parameter is missing"});
        }
        else if (isNaN(x))
        {
            HttpContext.response.JSON({ "op" : op, "x" : x, "y" : y, "error" : "'x' parameter is not a number"});
        }
        else if (isNaN(y)) {
            HttpContext.response.JSON({ "op" : op, "x" : x, "y" : y, "error" : "'y' parameter is not a number"});
        }
        else {
            const VALUE = x * y;

            if (Object.keys(params).length > 3)
            {
                HttpContext.response.JSON({ "op" : op, "x" : x, "y" : y, "value" : VALUE,
                    "error" : "There is many much parameters"});
            }
            else
            {
                HttpContext.response.JSON({ "op" : op, "x" : x, "y" : y, "value" : VALUE });
            }
        }
    }

    static division(HttpContext, x, y, op, params) {

        if (x === undefined) {
            HttpContext.response.JSON({ "op" : op, "x" : x, "y" : y, "error" : "'x' parameter is missing"});
        }
        else if (y === undefined) {
            HttpContext.response.JSON({ "op" : op, "x" : x, "y" : y, "error" : "'Y' parameter is missing"});
        }
        else if (isNaN(x))
        {
            HttpContext.response.JSON({ "op" : op, "x" : x, "y" : y, "error" : "'x' parameter is not a number"});
        }
        else if (isNaN(y)) {
            HttpContext.response.JSON({ "op" : op, "x" : x, "y" : y, "error" : "'y' parameter is not a number"});
        }
        else if (y == 0) {
            HttpContext.response.JSON({ "op" : op, "x" : x, "y" : y, "value" : "NaN", "error" : "'y' parameter must not be 0"});
        }
        else {
            const VALUE = parseFloat(x) / parseFloat(y);

            if (Object.keys(params).length > 3)
            {
                HttpContext.response.JSON({ "op" : op, "x" : x, "y" : y, "value" : VALUE,
                    "error" : "There is too many parameters"});
            }
            else
            {
                HttpContext.response.JSON({ "op" : op, "x" : x, "y" : y, "value" : VALUE });
            }
        }
    }

    static mod(HttpContext, x, y, op, params) {

        if (x === undefined) {
            HttpContext.response.JSON({ "op" : op, "x" : x, "y" : y, "error" : "'x' parameter is missing"});
        }
        else if (y === undefined) {
            HttpContext.response.JSON({ "op" : op, "x" : x, "y" : y, "error" : "'Y' parameter is missing"});
        }
        else if (isNaN(x))
        {
            HttpContext.response.JSON({ "op" : op, "x" : x, "y" : y, "error" : "'x' parameter is not a number"});
        }
        else if (isNaN(y)) {
            HttpContext.response.JSON({ "op" : op, "x" : x, "y" : y, "error" : "'y' parameter is not a number"});
        }
        else {
            let value = parseFloat(x) % parseFloat(y);
            value = value.toFixed(value.toString().length);

            if (Object.keys(params).length > 4)
            {
                HttpContext.response.JSON({ "op" : op, "x" : x, "y" : y, "value" : value,
                    "error" : "There is too many parameters"});
            }
            else
            {
    
                HttpContext.response.JSON({ "op" : op, "x" : x, "y" : y, "value" : value });
            }
        }
    }

    static factorial(HttpContext, n, op, params) {
        if (n === undefined) {
            HttpContext.response.JSON({ "op" : op, "n" : n, "error" : "'n' parameter is missing"});
        }
        else if (isNaN(n))
        {
            HttpContext.response.JSON({ "n" : n, "op" : op, "error" : "'n' parameter is not a number"});
        }
        else if (!MathsController.isInteger(n))
            HttpContext.response.unprocessable("'n' parameter is not an integer");
        else if (n == 0)
            HttpContext.response.JSON({ "n" : n, "op" : op, "error" : "'n' parameter can't be 0'"  });
            else {
                let value = 1;

                if (n < 0)
                    n = -n;
        
                for (let index = 2; index <= n; ++index) {
                    value *= index
                }

                if (Object.keys(params).length > 2)
                {
                    HttpContext.response.JSON({ "op" : op, "n" : n, "value" : value,
                        "error" : "There is too many parameters"});
                }
                else
                {
                    HttpContext.response.JSON({ "n" : n, "op" : op, "value" : value });
                }
            }
    }

    //celui du test
    static isPrimeNumber(n) {
        for (var i = 2; i < n; i++) {
            if (n % i === 0) {
                return false;
            }
        }
        return n > 1;
    }

    static isPrimeNumberServer(HttpContext, n, op, params) {
        if (n === undefined) {
            HttpContext.response.JSON({ "op" : op, "n" : n, "error" : "'n' parameter is missing"});
        }
        else if (isNaN(n))
        {
            HttpContext.response.JSON({ "n" : n, "op" : op, "error" : "'n' parameter is not a number"});
        }
        else if (!MathsController.isInteger(n))
            HttpContext.response.unprocessable("'n' parameter is not an integer");
        else if (n <= 0) {
            HttpContext.response.JSON({ "n": n, "op": op, "error" : "'n' parameter is not a valid number'" });
        }
        else {
            const VALUE = MathsController.isPrimeNumber(n);
            
            if (Object.keys(params).length > 2)
            {
                HttpContext.response.JSON({ "op" : op, "n" : n, "value" : VALUE,
                    "error" : "There is too many parameters"});
            }
            else
            {
                HttpContext.response.JSON({ "n": n, "op": op, "value" : VALUE });
            }
        }
    }

    static getNthPrime(HttpContext, n, op, params) {

        if (n === undefined) {
            HttpContext.response.JSON({ "op" : op, "n" : n, "error" : "'n' parameter is missing"});
        }
        else if (isNaN(n))
        {
            HttpContext.response.JSON({ "n" : n, "op" : op, "error" : "'n' parameter is not a number"});
        }
        else if (!MathsController.isInteger(n))
            HttpContext.response.unprocessable("'n' parameter is not an integer");
        else {
            //celui du test
            let value = 0;
            for (let i = 0; i < n; i++) {
                ++value;
                while (!MathsController.isPrimeNumber(value)) {
                    ++value;
                }
            }

            if (Object.keys(params).length > 2)
            {
                HttpContext.response.JSON({ "op" : op, "n" : n, "value" : value,
                    "error" : "There is too many parameters"});
            }
            else {
                HttpContext.response.JSON({ "n" : n, "op" : op, "value" : value });
            }
        }
    }
}