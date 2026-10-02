class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d', {willReadFrequently: true});
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let framebuffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(framebuffer);
                break;
            case 1:
                this.drawSlide1(framebuffer);
                break;
            case 2:
                this.drawSlide2(framebuffer);
                break;
            case 3:
                this.drawSlide3(framebuffer);
                break;
        }

        this.ctx.putImageData(framebuffer, 0, 0);
    }

    // framebuffer:  canvas ctx image data
    drawSlide0(framebuffer) {
        // TODO: draw at least 2 Bezier curves
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        this.drawBezierCurve({x: 100, y: 400}, {x: 150, y: 100}, {x: 350, y: 100}, {x: 400, y: 400},
            this.num_curve_sections, [255, 0, 0, 255], framebuffer);
        
        // Following line is example of drawing a single line
        // (this should be removed after you implement the curve)
        this.drawBezierCurve({x: 450, y: 150}, {x: 750, y: 150}, {x: 450, y: 350}, {x: 750, y: 350},
            this.num_curve_sections, [0, 0, 255, 255], framebuffer);

    }

    // framebuffer:  canvas ctx image data
    drawSlide1(framebuffer) {
        // TODO: draw at least 2 circles
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        this.drawCircle({x: 250, y: 300}, 100, this.num_curve_sections, [0, 128, 0, 255], framebuffer);
        this.drawCircle({x: 550, y: 300}, 150, this.num_curve_sections, [128, 0, 128, 255], framebuffer);
        
    }

    // framebuffer:  canvas ctx image data
    drawSlide2(framebuffer) {
        // TODO: draw at least 2 convex polygons (each with a different number of vertices >= 5)
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        let pentagon = [
        {x: 200, y: 100}, {x: 300, y: 170}, {x: 260, y: 290},
        {x: 140, y: 290}, {x: 100, y: 170}
    ];
    this.drawConvexPolygon(pentagon, [0, 128, 128, 255], framebuffer);

    let hexagon = [
        {x: 500, y: 100}, {x: 600, y: 100}, {x: 660, y: 200},
        {x: 600, y: 300}, {x: 500, y: 300}, {x: 440, y: 200}
    ];
    this.drawConvexPolygon(hexagon, [255, 140, 0, 255], framebuffer);
    }

        
        // Following lines are example of drawing a single triangle
        // (this should be removed after you implement the polygon)
       

    // framebuffer:  canvas ctx image data
    drawSlide3(framebuffer) {
        // TODO: draw your name!
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
       

        let color = [30, 30, 200, 255];
        let n = this.num_curve_sections;
        let y = 225;
        let x;

        // ---------- K ----------
        x = 70;
        this.drawLine({x: x, y: y}, {x: x, y: y + 150}, color, framebuffer);             // spine
        this.drawLine({x: x + 80, y: y}, {x: x, y: y + 85}, color, framebuffer);         // upper arm
        this.drawLine({x: x + 25, y: y + 62}, {x: x + 80, y: y + 150}, color, framebuffer); // lower leg
        if (this.show_points) {
            this.drawVertex({x: x, y: y}, [0, 0, 0, 255], framebuffer);
            this.drawVertex({x: x, y: y + 150}, [0, 0, 0, 255], framebuffer);
            this.drawVertex({x: x + 80, y: y}, [0, 0, 0, 255], framebuffer);
            this.drawVertex({x: x, y: y + 85}, [0, 0, 0, 255], framebuffer);
            this.drawVertex({x: x + 25, y: y + 62}, [0, 0, 0, 255], framebuffer);
            this.drawVertex({x: x + 80, y: y + 150}, [0, 0, 0, 255], framebuffer);
    }

        // ---------- I ----------
        x = 210;
        this.drawLine({x: x + 10, y: y}, {x: x + 90, y: y}, color, framebuffer);          // top bar
        this.drawLine({x: x + 50, y: y}, {x: x + 50, y: y + 150}, color, framebuffer);    // stem
        this.drawLine({x: x + 10, y: y + 150}, {x: x + 90, y: y + 150}, color, framebuffer); // bottom bar
        if (this.show_points) {
            this.drawVertex({x: x + 10, y: y}, [0, 0, 0, 255], framebuffer);
            this.drawVertex({x: x + 90, y: y}, [0, 0, 0, 255], framebuffer);
            this.drawVertex({x: x + 50, y: y + 150}, [0, 0, 0, 255], framebuffer);
            this.drawVertex({x: x + 10, y: y + 150}, [0, 0, 0, 255], framebuffer);
            this.drawVertex({x: x + 90, y: y + 150}, [0, 0, 0, 255], framebuffer);
    }

        // ---------- D ----------
        x = 350;
        
        this.drawLine({x: x, y: y}, {x: x, y: y + 150}, color, framebuffer);              // spine
        this.drawBezierCurve({x: x, y: y}, {x: x + 130, y: y},
                            {x: x + 130, y: y + 150}, {x: x, y: y + 150},
                            n, color, framebuffer);                                       // bulge (draws its own points)

        // ---------- U ----------
       
        x = 490;
        this.drawLine({x: x, y: y + 150}, {x: x, y: y + 60}, color, framebuffer);            // left side
        this.drawLine({x: x + 100, y: y + 150}, {x: x + 100, y: y + 60}, color, framebuffer); // right side
        this.drawBezierCurve({x: x, y: y + 60}, {x: x, y: y - 30},
                            {x: x + 100, y: y - 30}, {x: x + 100, y: y + 60},
                            n, color, framebuffer);                                          // bottom curve
        if (this.show_points) {
            this.drawVertex({x: x, y: y + 150}, [0, 0, 0, 255], framebuffer);                // tops of the two sides
            this.drawVertex({x: x + 100, y: y + 150}, [0, 0, 0, 255], framebuffer);
    }
    // ---------- S ----------
        x = 630;
            this.drawBezierCurve({x: x + 95, y: y + 20}, {x: x + 60, y: y - 10},
                             {x: x, y: y + 10}, {x: x + 50, y: y + 75},
                                n, color, framebuffer);                                       // upper curve
            this.drawBezierCurve({x: x + 50, y: y + 75}, {x: x + 100, y: y + 140},
                            {x: x + 40, y: y + 160}, {x: x + 5, y: y + 130},
                                n, color, framebuffer);
    }

        
    // p0:           object {x: __, y: __}
    // p1:           object {x: __, y: __}
    // p2:           object {x: __, y: __}
    // p3:           object {x: __, y: __}
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawBezierCurve(p0, p1, p2, p3, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a Bezier curve
        let prev = {x: p0.x, y: p0.y};          // t = 0 is the starting endpoint

        for (let i = 1; i <= num_edges; i++) {
            let t = i / num_edges;               // goes from just above 0 up to 1.0
            let u = 1 - t;

            // the two equations from the assignment
            let x = u*u*u * p0.x + 3*u*u*t * p1.x + 3*u*t*t * p2.x + t*t*t * p3.x;
            let y = u*u*u * p0.y + 3*u*u*t * p1.y + 3*u*t*t * p2.y + t*t*t * p3.y;

            // drop the decimals, since Bresenham works on whole pixels
            let curr = {x: parseInt(x), y: parseInt(y)};

            this.drawLine(prev, curr, color, framebuffer);
            prev = curr;
    }

        if (this.show_points) {
            this.drawVertex(p0, [0, 0, 0, 255], framebuffer);
            this.drawVertex(p3, [0, 0, 0, 255], framebuffer);
            this.drawVertex(p1, [255, 0, 0, 255], framebuffer);   // control points are red
            this.drawVertex(p2, [255, 0, 0, 255], framebuffer);
        }

    }
    
        
    

    // center:       object {x: __, y: __}
    // radius:       int
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawCircle(center, radius, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a circle
        let prev = {x: center.x + radius, y: center.y};   // angle 0 = straight right of center

        for (let i = 1; i <= num_edges; i++) {
            let angle = 2 * Math.PI * i / num_edges;      // full circle split into num_edges steps

            // polar to x,y from the assignment
            let x = center.x + radius * Math.cos(angle);
            let y = center.y + radius * Math.sin(angle);

            let curr = {x: parseInt(x), y: parseInt(y)};
            this.drawLine(prev, curr, color, framebuffer);

            if (this.show_points) {
                this.drawVertex(curr, [0, 0, 0, 255], framebuffer);
            }
             prev = curr; 
        }
        
    }


        
    
    
    // vertex_list:  array of object [{x: __, y: __}, {x: __, y: __}, ..., {x: __, y: __}]
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawConvexPolygon(vertex_list, color, framebuffer) {
        // TODO: draw a sequence of triangles to form a convex polygon
        for (let i = 1; i < vertex_list.length - 1; i++) {
        this.drawTriangle(vertex_list[0], vertex_list[i], vertex_list[i + 1], color, framebuffer);
    }

    if (this.show_points) {
        for (let i = 0; i < vertex_list.length; i++) {
            this.drawVertex(vertex_list[i], [0, 0, 0, 255], framebuffer);
            }
    }
    
    }
    
    // v:            object {x: __, y: __}
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawVertex(v, color, framebuffer) {
        // TODO: draw some symbol (e.g. small rectangle, two lines forming an X, ...) centered at position `v`
         for (let x = v.x - 2; x <= v.x + 2; x++) {
        for (let y = v.y - 2; y <= v.y + 2; y++) {
            this.setFramebufferColor(color, x, y, framebuffer);
        }
    }
        
    }
    
    /***************************************************************
     ***       Basic Line and Triangle Drawing Routines          ***
     ***       (code provided from in-class activities)          ***
     ***************************************************************/
    pixelIndex(x, y, framebuffer) {
	    return 4 * y * framebuffer.width + 4 * x;
    }
    
    setFramebufferColor(color, x, y, framebuffer) {
	    let p_idx = this.pixelIndex(x, y, framebuffer);
        for (let i = 0; i < 4; i++) {
            framebuffer.data[p_idx + i] = color[i];
        }
    }
    
    swapPoints(a, b) {
        let tmp = {x: a.x, y: a.y};
        a.x = b.x;
        a.y = b.y;
        b.x = tmp.x;
        b.y = tmp.y;
    }

    drawLine(p0, p1, color, framebuffer) {
        if (Math.abs(p1.y - p0.y) <= Math.abs(p1.x - p0.x)) { // |m| <= 1
            if (p0.x < p1.x) {
                this.drawLineLow(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineLow(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
        else {                                                // |m| > 1
            if (p0.y < p1.y) {
                this.drawLineHigh(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineHigh(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
    }
    
    drawLineLow(x0, y0, x1, y1, color, framebuffer) {
        let A = y1 - y0;
        let B = x0 - x1;
        let iy = 1; // y increment (+1 for positive slope, -1 for negative slop)
        if (A < 0) {
            iy = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let D0 = 2 * A;
        let D1 = 2 * A + 2 * B;
    
        let y = y0;
        for (let x = x0; x <= x1; x++) {
            this.setFramebufferColor(color, x, y, framebuffer);
            if (D <= 0) {
                D += D0;
            }
            else {
                D += D1;
                y += iy;
            }
        }
    }
    
    drawLineHigh(x0, y0, x1, y1, color, framebuffer) {
        let A = x1 - x0;
        let B = y0 - y1;
        let ix = 1; // x increment (+1 for positive slope, -1 for negative slop)
        if (A < 0) {
            ix = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let D0 = 2 * A;
        let D1 = 2 * A + 2 * B;
    
        let x = x0;
        for (let y = y0; y <= y1; y++) {
            this.setFramebufferColor(color, x, y, framebuffer);
            if (D <= 0) {
                D += D0;
            }
            else {
                D += D1;
                x += ix;
            }
        }
    }
    
    drawTriangle(p0, p1, p2, color, framebuffer) {
        // Deep copy, then sort points in ascending y order
        p0 = {x: p0.x, y: p0.y};
        p1 = {x: p1.x, y: p1.y};
        p2 = {x: p2.x, y: p2.y};
        if (p1.y < p0.y) this.swapPoints(p0, p1);
        if (p2.y < p0.y) this.swapPoints(p0, p2);
        if (p2.y < p1.y) this.swapPoints(p1, p2);
        
        // Edge coherence triangle algorithm
        // Create initial edge table
        let edge_table = [
            {x: p0.x, inv_slope: (p1.x - p0.x) / (p1.y - p0.y)}, // edge01
            {x: p0.x, inv_slope: (p2.x - p0.x) / (p2.y - p0.y)}, // edge02
            {x: p1.x, inv_slope: (p2.x - p1.x) / (p2.y - p1.y)}  // edge12
        ];
        
        // Do cross product to determine if pt1 is to the right/left of edge02
        let v01 = {x: p1.x - p0.x, y: p1.y - p0.y};
        let v02 = {x: p2.x - p0.x, y: p2.y - p0.y};
        let p1_right = ((v01.x * v02.y) - (v01.y * v02.x)) >= 0;
        
        // Get the left and right edges from the edge table (lower half of triangle)
        let left_edge, right_edge;
        if (p1_right) {
            left_edge = edge_table[1];
            right_edge = edge_table[0];
        }
        else {
            left_edge = edge_table[0];
            right_edge = edge_table[1];
        }
        // Draw horizontal lines (lower half of triangle)
        for (let y = p0.y; y < p1.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) { 
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
        
        // Get the left and right edges from the edge table (upper half of triangle) - note only one edge changes
        if (p1_right) {
            right_edge = edge_table[2];
        }
        else {
            left_edge = edge_table[2];
        }
        // Draw horizontal lines (upper half of triangle)
        for (let y = p1.y; y < p2.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) {
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
       
    }
};
 export { Renderer };

